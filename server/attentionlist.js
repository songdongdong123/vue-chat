const express = require('express')
const Router = express.Router()
const sequelize = require('./db')

const account = sequelize.model('account')
const attentionlists = sequelize.model('attentionlist')
attentionlists.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')

Router.get('/getUserFans', function (req, res) {
  // 获取当前用户粉丝列表
  attentionlists.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'create_temp', 'user_id', 'user_info'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
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