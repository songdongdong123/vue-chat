const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')
const guestbook = sequelize.model('guestbook')
const supportlist = sequelize.model('supportlist')
const attentionlist = sequelize.model('attentionlist')
account.hasMany(guestbook,{foreignKey: 'user_id', targetKey: 'user_id'});
account.hasMany(poetrylist,{foreignKey: 'user_id', targetKey: 'user_id'});
guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')

Router.post('/getPoetryBrief', function(req, res) {
  const poetrylist_id = req.body.poetrylist_id
  poetrylist.findOne({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {poetrylist_id: poetrylist_id},
    attributes: ['content', 'create_temp']
  }).then(ret => {
    return res.json({
      code: 0,
      data: ret
    })
  })
})

module.exports = Router