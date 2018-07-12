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
attentionlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
transmitlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
supportlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')

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
  // 获取转发列表
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
  // 获取点赞列表
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
  // 关注
  const data = {
    user_id: req.cookies.user_id,
    target_id: req.body.target_id
  }
  attentionlist.create(data).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})




module.exports = Router