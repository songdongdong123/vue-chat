const express = require('express')
const Router = express.Router()
const sequelize = require('./db')

const account = sequelize.model('account')
const attentionlists = sequelize.model('attentionlist')
// attentionlists.belongsTo(account, {foreignKey: 'user_id'});

const utility  = require('utility')

Router.get('/getUserFans', function (req, res) {
  // attentionlists.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'})
  // 获取当前用户粉丝列表
  attentionlists.findAll({
    include: [{
      model: account
      // association: attentionlists.hasOne(account,{foreignKey: 'user_id', targetKey: 'user_id'})
    }],
    where: {'target_id': req.cookies.user_id}
  }).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})


module.exports = Router