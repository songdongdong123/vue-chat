const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')
const guestbook = sequelize.model('guestbook')
account.hasMany(guestbook,{foreignKey: 'user_id', targetKey: 'user_id'});
guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
account.hasMany(poetrylist,{foreignKey: 'user_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')

Router.get('/test', function (req, res) {
  return res.json({
    code: 1,
    arr: [{
      name: 1231
    }]
  })
})

Router.post('/register', function(req, res) {
  // 用户注册
  const body = req.body.userinfo
  const {user_name, pwd} = req.body.userinfo
  const data = {
    user_name: user_name,
    pwd: pwdMd5(pwd),
    create_temp: new Date().getTime(),
    user_id: pwdMd5(Date.now())
  }
  account.create(data).then(doc => {
    const {user_name, user_id, user_info, avatar} = doc
    res.cookie('user_id', user_id)
    return res.json({
      code: 0,
      data: {
        user_name: user_name,
        user_id: user_id,
        user_info: user_info,
        avatar: avatar
      }
    })
  })
})

Router.post('/updataUserInfo', function(req,res) {
  // 完善用户信息
  const user_id = req.cookies.user_id
  const user_info = req.body.userinfo
  account.update(user_info, {'where': {'user_id': user_id}}).then((doc) => {
    return res.json({
      code: 0,
      data: {
        user_info: user_info
      }
    })
  })
})

Router.post('/getUserInfo', function(req,res) {
  // 完善用户信息
  const user_id = req.cookies.user_id
  account.findOne({
    'where': {'user_id': user_id},
    attributes: ['user_name','email', 'avatar', 'user_info', 'create_temp']
  }).then((doc) => {
    // 过滤用户信息
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.get('/getalluser', function(req,res) {
  // 用户列表
  account.findAll({}).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
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
  const user_id = req.cookies.user_id
  poetrylist.update({recommend: num},{'where':{'user_id': user_id}}).then(doc => {
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
    poetrylist_id: pwdMd5(Date.now()),
    user_id: req.cookies.user_id
  },body)
  poetrylist.create(data).then(doc => {
    account.findOne({
      'where': {'user_id':req.cookies.user_id},
      attributes: ['user_name', 'avatar']
    }).then(ret => {
      return res.json({
        code: 0,
        data: {
          account: ret,
          content: doc.content,
          create_temp: doc.create_temp,
          poetrylist_id: doc.poetrylist_id,
          recommend: doc.recommend,
          star: doc.star,
          user_id: doc.user_id
        }
      })
    })
  })
})

Router.get('/getPoetryList', function(req, res) {
  // 获取全部骚话
  poetrylist.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    attributes: ['content', 'poetrylist_id', 'recommend', 'star', 'user_id', 'create_temp', 'guest_num']
  }).then((doc) => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/login', function(req, res) {
  // 用户登录
  const {user_name, pwd} = req.body
  account.findOne({'where': {'user_name': user_name, 'pwd': pwdMd5(pwd)}}).then(doc => {
    if (doc) {
      res.cookie('user_id', doc.user_id)
      return res.json({
        code:0,
        data: {
          user_name: doc.user_name,
          user_id: doc.user_id
        }
      })
    } else {
      return res.json({
        code: 1,
        msg: '用户名或密码不存在'
      })
    }
  })
})

Router.post('/searchPoetryDetail', function(req, res) {
  const {user_id, poetrylist_id} = req.body
  account.findOne({
    'where': {'user_id': user_id},
    attributes: ['avatar', 'user_fans', 'user_info', 'user_name', 'create_temp']
  }).then(doc => {
    poetrylist.findOne({
      'where': {'poetrylist_id':poetrylist_id},
      attributes: ['content', 'create_temp', 'recommend', 'star', 'poetrylist_id']
    }).then(ret => {
      const datas = Object.assign({},{doc},{ret})
      return res.json({
        code: 0,
        data: datas
      })
    })
  })
})

Router.post('/sendComment', function (req, res) {
  // 发表评论
  const data = Object.assign({},req.body,{
    guest_time: Date.now(),
    user_id: req.cookies.user_id
  })
  console.log(req.cookies)
  const poetrylist_id = req.body.poetrylist_id
  const guest_num = req.body.guest_num
  guestbook.create(data).then(doc => {
    poetrylist.update(
      {'guest_num': guest_num},
      {'where':{
        'poetrylist_id': poetrylist_id
      }}).then(ret => {
        return res.json({
          code: 0,
          data: doc,
          ret: ret
        })
    })
  })
})

Router.post('/getAllComments', function(req, res) {
  const poetrylist_id = req.body.poetrylist_id
  guestbook.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {'poetrylist_id': poetrylist_id},
    attributes: ['guest_count', 'guest_time', 'star_num', 'transpond']
  }).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

// 我们自己对原始的MD5进行复杂度调整
function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}


module.exports = Router