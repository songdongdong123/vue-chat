import * as types from './mutation-types'
import { Loading } from '../Plugins/index'
import { getPoetryList, addPoetryItem, linkThisPoetry } from 'api/home'
import { register, updataUserInfo, getUserInfo, login } from 'api/account'
import { getPoetryDetail, getTransmitList, getSupportList, subscription, getUserFans, getUserAttentionlist } from 'api/poetry'
import { sendComment, getAllComments } from 'api/comment'
import { getChatMsgList, readMsg } from 'api/chat'
// import { getChatId } from 'common/js/common'
import io from 'socket.io-client'
const socket = io('ws://localhost:9094')
const poetryList = function ({commit, state}) {
  // 获取文章列表
  getPoetryList({}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      commit(types.SET_POETRY_LIST, res.data.data)
      Loading({
        state: false
      })
    } else {
      commit(types.SET_POETRY_LIST, [])
    }
  })
}

const setPoetryItem = function ({commit, state}, {item, star}) {
  // 发表骚话
  return new Promise((resolve, reject) => {
    addPoetryItem({item, star}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const poetryList = state.poetryList.concat(res.data.data)
        commit(types.SET_POETRY_ITEM, item)
        commit(types.SET_POETRY_LIST, poetryList)
        resolve(res.data)
      } else {
        reject(new Error())
      }
    })
  })
}

const registerAccount = function ({commit, state}, {userinfo}) {
  // 用户注册
  // 这里返回一个Promise函数，方便在组件中知道当前接口是否请求完成
  return new Promise((resolve, reject) => {
    register({userinfo}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data.data)
      } else {
        reject(new Error())
      }
    })
  })
}

const _updataUserInfo = function ({commit, state}, {userinfo}) {
  // 完善用户信息
  return new Promise((resolve, reject) => {
    updataUserInfo({userinfo}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data.data)
      } else {
        reject(new Error())
      }
    })
  })
}

const _getUserInfo = function ({commit, state}, {userid}) {
  // 获取用户信息
  // console.log(userid)
  return new Promise((resolve, reject) => {
    getUserInfo(userid).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        commit(types.SET_USER_INFO, res.data.data)
        resolve(res.data.data)
      } else {
        reject(new Error())
      }
    })
  })
}

const userLogin = function ({commit, state}, {userinfo}) {
  // 用户登录
  return new Promise((resolve, reject) => {
    login(userinfo).then(res => {
      resolve(res)
    })
  })
}
const _getPoetryDetail = function ({commit, state}, {id}) {
  // 获取文章详情
  return new Promise((resolve, reject) => {
    getPoetryDetail(id).then(res => {
      resolve(res)
    })
  })
}

const sendArtComment = function ({commit, state}, {comment}) {
  // 发表评论
  return new Promise((resolve, reject) => {
    sendComment(comment).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const commentlist = [].concat(res.data.data).concat(state.commentlist)
        commit(types.SET_COMMENT_LIST, commentlist)
        resolve(res)
      }
    })
  })
}

const _getAllComments = function ({commit, state}, {id}) {
  // 获取文章评论列表
  return new Promise((resolve, reject) => {
    getAllComments(id).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        commit(types.SET_COMMENT_LIST, res.data.data)
      }
    })
  })
}

const likePoetry = function ({commit, state}, {item}) {
  // 点赞
  return new Promise((resolve, reject) => {
    linkThisPoetry(item).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const poetryList = JSON.parse(JSON.stringify(state.poetryList))
        poetryList.map(v => {
          if (item.poetrylist_id === v.poetrylist_id) {
            v.recommend = item.recommend
            v.isAttention = item.isAttention
          }
          return v
        })
        commit(types.SET_POETRY_LIST, poetryList)
        resolve(res.data)
      }
    })
  })
}

const _getTransmitList = function ({commit, state}, poetrylistId) {
  // 获取当前文章转发列表
  return new Promise((resolve, reject) => {
    getTransmitList({
      poetrylist_id: poetrylistId
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data)
      }
    })
  })
}

const _getSupportList = function ({commit, state}, poetrylistId) {
  // 获取点赞列表
  return new Promise((resolve, reject) => {
    getSupportList({
      poetrylist_id: poetrylistId
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data)
      }
    })
  })
}

const _subscription = function ({commit, state}, {targetId, num}) {
  return new Promise((resolve, reject) => {
    subscription({
      target_id: targetId.target_id
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data)
      }
    })
  })
}

const _getUserAttentionlist = function ({commit, state}) {
  return new Promise((resolve, reject) => {
    getUserAttentionlist({}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data)
      }
    })
  })
}

const _getUserFans = function ({commit, state}) {
  return new Promise((resolve, reject) => {
    getUserFans({}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data)
      }
    })
  })
}

const getMsgList = function ({commit, state}) {
  getChatMsgList({}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      commit(types.SET_MSG_LIST, res.data.data)
      const msgGroup = {}
      res.data.data.forEach(v => {
        msgGroup[v.chatid] = msgGroup[v.chatid] || []
        msgGroup[v.chatid].push(v)
      })
      const chatList = Object.values(msgGroup)
      commit(types.SET_CHAT_LIST, chatList)
      commit(types.SET_USERS, res.data.users)
    }
  })
}
const sendMsg = function ({commit, state}, {form, to, msg}) {
  socket.emit('sendmsg', {form, to, msg})
}

const recvMsg = function ({commit, state}) {
  socket.on('recvemsg', function (data) {
    const msglist = [...state.msglist, data]
    commit(types.SET_MSG_LIST, msglist)
    const msgGroup = {}
    msglist.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup)
    commit(types.SET_CHAT_LIST, chatList)
  })
}

const _readMsg = function ({commit, state}, form) {
  readMsg({form}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      const msglist = state.msglist.map(v => ({...v, read: form === v.to ? true : v.read}))
      const msgGroup = {}
      msglist.forEach(v => {
        msgGroup[v.chatid] = msgGroup[v.chatid] || []
        msgGroup[v.chatid].push(v)
      })
      const chatList = Object.values(msgGroup)
      commit(types.SET_CHAT_LIST, chatList)
    }
  })
}

export {
  poetryList,
  setPoetryItem,
  registerAccount,
  _updataUserInfo,
  _getUserInfo,
  userLogin,
  _getPoetryDetail,
  sendArtComment,
  _getAllComments,
  likePoetry,
  _getTransmitList,
  _getSupportList,
  _subscription,
  _getUserAttentionlist,
  _getUserFans,
  getMsgList,
  sendMsg,
  recvMsg,
  _readMsg
}
