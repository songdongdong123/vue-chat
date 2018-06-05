const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')

Router.get('/test', function (req, res) {
  return res.json({
    code: 1,
    arr: [{
      name: 123
    }]
  })
})

Router.get('/getPoetryList', function(req, res) {
  // 查询全部数据
  poetrylist.findAll({}).then((doc) => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/register', function (req, res) {
  // console.log(req.body)
  return res.json({
    code: 0,
    data: req.body
  })
  // var test = {
  //   username: 'admin2',
  //   pwd: '123456',
  //   email: '172529131@qq.com',
  //   avatar: 'admin',
  //   desc: '我是超级管理员1',
  //   userid: '000000000000000002',
  //   create_temp: new Date().getTime()
  // };
  // account.create(test).then(function(msg){
  //   console.log(msg)
  //   return res.json({
  //     code: 0,
  //     data: msg
  //   })
  // })
  // console.log(account.get({'plain': true}))
})


module.exports = Router