const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')

const utility  = require('utility')

Router.get('/test', function (req, res) {
  return res.json({
    code: 1,
    arr: [{
      name: 123
    }]
  })
})

Router.get('/cleardata', function(req,res) {
  // 清空全部数据
  poetrylist.destroy({'where':{'id': 13}}).then((doc) => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/linkPoetry', function(req, res) {
  // 点赞骚话
  const num = req.body.num
  const id = req.body.id
  poetrylist.update({recommend: num},{'where':{id: id}}).then(doc => {
    return res.json({
      code: 0,
      data: num
    })
  })
})

Router.post('/addPoetryItem', function(req, res) {
  // 发表一个骚话
  // pwdMd5
  const body = req.body.item
  const data = Object.assign({},{
    poetrylist_id: pwdMd5(Date.now())
  },body)
  poetrylist.create(data).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.get('/getPoetryList', function(req, res) {
  // 获取全部骚话
  poetrylist.findAll({}).then((doc) => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/register', function (req, res) {
  // console.log(req.body)
  // 注册
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

// 我们自己对原始的MD5进行复杂度调整
function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}


module.exports = Router