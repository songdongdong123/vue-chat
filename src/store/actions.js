import * as types from './mutation-types'
import { Loading } from '../Plugins/index'
import { getPoetryList, addPoetryItem } from 'api/home'
import { register, updataUserInfo, getUserInfo } from 'api/account'
const poetryList = function ({commit, state}) {
  // 获取骚话列表
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

const setPoetryItem = function ({commit, state}, {item}) {
  // 发表骚话
  addPoetryItem({item}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      const poetryList = state.poetryList.concat(item)
      commit(types.SET_POETRY_ITEM, item)
      commit(types.SET_POETRY_LIST, poetryList)
    }
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

const _getUserInfo = function ({commit, state}) {
  // 获取用户信息
  return new Promise((resolve, reject) => {
    getUserInfo({}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        commit(types.SET_USER_INFO, res.data.data)
        resolve(res.data.data)
      } else {
        reject(new Error())
      }
    })
  })
}

export {
  poetryList,
  setPoetryItem,
  registerAccount,
  _updataUserInfo,
  _getUserInfo
}
