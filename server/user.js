const express = require('express')

const Router = express.Router()

const sequelize = require('./db')
const account = sequelize.model('account')
const poetrylist = sequelize.model('poetrylist')
const guestbook = sequelize.model('guestbook')
const supportlist = sequelize.model('supportlist')
const attentionlist = sequelize.model('attentionlist')
const transmitlist = sequelize.model('transmitlist')
guestbook.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
poetrylist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});
transmitlist.belongsTo(account, {foreignKey: 'user_id', targetKey: 'user_id'});

const utility  = require('utility')


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
  const user_id = req.body.user_id ? req.body.user_id : req.cookies.user_id
  account.findOne({
    'where': {'user_id': user_id},
    attributes: ['user_name', 'avatar', 'user_info', 'user_fans', 'attention', 'poetry_num', 'user_id']
  }).then((doc) => {
    poetrylist.findAll({
      where: {'user_id': user_id},
      order: [
        ['create_temp', 'DESC'],
      ]
    }).then((metadata) => {
      return res.json({
        code: 0,
        data: {
          user_info: doc,
          list: metadata
        }
      })
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
  poetrylist.destroy({
    
  }).then((doc) => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})


Router.post('/addPoetryItem', function(req, res) {
  // 发表微博
  // pwdMd5
  const body = req.body.item
  const star = req.body.star
  const data = Object.assign({},{
    poetrylist_id: pwdMd5(Date.now()),
    user_id: req.cookies.user_id
  },body)
  // 根据是否有star这个参数判断是新增的文章还是转发的文章
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
  if (star) {
    // 存储转发时的评论信息
    let tramsmitmsg = {
      poetrylist_id: body.transmit_poetrylist_id,
      content: body.content,
      user_id: req.cookies.user_id
    }
    transmitlist.create(tramsmitmsg).then(() => {})
    // 更新文章的转发数量
    poetrylist.update(
      {'star': star.star},
      {'where': {
        'poetrylist_id': body.transmit_poetrylist_id
      }}
    ).then(() => {})
  }
})

Router.get('/getPoetryList', function(req, res) {
  // 获取文章列表
  poetrylist.findAll({
    include: [{
      model: account,
      attributes: ['user_name', 'avatar', 'user_id'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    attributes: [
      'content',
      'poetrylist_id',
      'recommend',
      'star',
      'user_id',
      'create_temp',
      'guest_num',
      'transmit_content',
      'transmit_user_id',
      'transmit_user_name',
      'transmit_poetrylist_id',
      'id'],
    order: [
      ['create_temp', 'DESC'],
    ]
  }).then((doc) => {
    supportlist.findAll({
      // 获取当前用户的点赞文章的列表
      where: {
        "user_id": req.cookies.user_id
      }
    }).then(suplist => {
      // 数据处理
      for (let i = 0; i < doc.length; i++) {
        doc[i].dataValues.isAttention = false
        if (suplist.length) {
          for (let j = 0; j < suplist.length; j++) {
            if (doc[i].dataValues.poetrylist_id === suplist[j].dataValues.poetrylist_id){
              doc[i].dataValues.isAttention = true
            }
          }
        } else {
          doc[i].dataValues.isAttention = false
        }
      }
      return res.json({
        code: 0,
        data: doc,
        suplist: suplist
      })
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
  // 查询文章详情
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
  const poetrylist_id = req.body.poetrylist_id
  const guest_num = req.body.guest_num
  account.findOne({
    'where': {'user_id': req.cookies.user_id},
    attributes: ['avatar', 'user_name']
  }).then(userinfo => {
    guestbook.create(data).then(doc => {
      poetrylist.update(
        {'guest_num': guest_num},
        {'where':{
          'poetrylist_id': poetrylist_id
        }}).then(ret => {
          const desc = Object.assign({}, {
            account: {
              avatar: userinfo.avatar,
              user_name: userinfo.user_name
            }
          }, doc.dataValues)
          return res.json({
            code: 0,
            data: desc
          })
      })
    })
  })
})

Router.post('/getAllComments', function(req, res) {
  // 获取全部评论
  const poetrylist_id = req.body.poetrylist_id
  guestbook.findAll({
    include: [{ // 连表查询
      model: account,
      attributes: ['user_name', 'avatar'] // 想要只选择某些属性可以使用 attributes: ['foo', 'bar']
    }],
    where: {'poetrylist_id': poetrylist_id},
    attributes: ['guest_count', 'guest_time', 'star_num', 'transpond'],
    order: [ // 排序
      ['guest_time', 'DESC'],
    ]
  }).then(doc => {
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/linkThisPoetry', function(req, res) {
  // 点赞文章
  supportlist.findOne({
    // 先查找该用户对该文章是否已经点赞过
    where: {
      user_id: req.cookies.user_id,
      poetrylist_id: req.body.poetrylist_id
    }
  }).then(doc => {
    // 服务端限制每个用户对一篇文章只能点赞一次
    if (!doc) {
      supportlist.create({
        user_id: req.cookies.user_id,
        poetrylist_id: req.body.poetrylist_id
      }).then(doc => {
        // 更新点赞数量
        poetrylist.update(
          {'recommend': req.body.recommend},
          {'where': {
            'poetrylist_id': req.body.poetrylist_id
          }}
        ).then(ret => {
          return res.json({
            code: 0,
            data: ret
          })
        })
      })
    } else {
      // 取消点赞
      supportlist.destroy({
        where: {
          'poetrylist_id': req.body.poetrylist_id
        }
      }).then(ret => {
        // 更新点赞数量
        poetrylist.update(
          {'recommend': req.body.recommend},
          {'where': {
            'poetrylist_id': req.body.poetrylist_id
          }}
        ).then(ret => {
          return res.json({
            code: 0,
            data: ret
          })
        })
      })
    }
  })
  
})

// 我们自己对原始的MD5进行复杂度调整
function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}


module.exports = Router