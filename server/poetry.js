const express = require('express')
const Router = express.Router()
const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')
const guestbook = sequelize.model('guestbook')
const supportlist = sequelize.model('supportlist')
const attentionlist = sequelize.model('attentionlist')
const transmitlist = sequelize.model('transmitlist')
account.hasMany(guestbook,{foreignKey: 'user_id', targetKey: 'user_id'});
account.hasMany(poetrylist,{foreignKey: 'user_id', targetKey: 'user_id'});
// account.hasMany(supportlist,{foreignKey: 'user_id', targetKey: 'user_id'});
guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
attentionlist.belongsTo(account, {foreignKey: 'target_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
transmitlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
supportlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')


Router.get('/getUserAttentionlist', function (req, res) {
  // 获取用户关注列表
  attentionlist.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp', 'user_id', 'user_info'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {'user_id': req.cookies.user_id}
  }).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/getPoetryBrief', function(req, res) {
  // 转发消息内容获取（包括用户信息）
  const poetrylist_id = req.body.poetrylist_id
  poetrylist.findOne({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp', 'user_id'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {poetrylist_id: poetrylist_id},
    attributes: ['content', 'create_temp', 'star', 'poetrylist_id']
  }).then(ret => {
    return res.json({
      code: 0,
      data: ret
    })
  })
})

Router.post('/getTransmitList', function(req, res) {
  // 获取当前文章的转发列表
  const poetrylist_id = req.body.poetrylist_id
  transmitlist.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp', 'user_id'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {poetrylist_id: poetrylist_id}
  }).then(ret => {
    return res.json({
      code: 0,
      data: ret
    })
  })
})

Router.post('/getSupportList', function(req, res) {
  // 获取当前文章的点赞列表
  const poetrylist_id = req.body.poetrylist_id
  supportlist.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp', 'user_id'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {poetrylist_id: poetrylist_id}
  }).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/subscription', function (req, res) {
  // 关注功能
  const data = {
    user_id: req.cookies.user_id,
    target_id: req.body.target_id
  }
  // Transaction是Sequelize中用于实现事务功能的子类，
  // 通过调用Sequelize.transaction()方法可以创建一个该类的实例。
  // 在Sequelize中，支持自动提交/回滚，也可以支持用户手动提交/回滚。
  return sequelize.transaction(t => {
    return attentionlist.findOne({
      'where': {
        'user_id': req.cookies.user_id,
        'target_id': req.body.target_id
      }
    },{transaction: t}).then(doc => {
      if (!doc) {
        return attentionlist.create(data,{transaction: t}).then(ret => {
          return account.findOne({
            'where': {'user_id': req.cookies.user_id},
            attributes: ['attention']
          })
        }, {transaction: t}).then(rets => {
          let attention = rets.attention + 1
          return account.update(
            {'attention': attention},
            {
            'where': {'user_id': req.cookies.user_id}
            }
          )
        }, {transaction: t}).then(docs => {
          return docs
        })
      } else {
        return 100
      }
    })
  }).then(result => {
    return res.json({
      code: 0,
      data: result
    })
  })
})




module.exports = Router