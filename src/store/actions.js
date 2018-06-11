import * as types from './mutation-types'
import { Loading } from '../Plugins/index'
import { getPoetryList, addPoetryItem } from 'api/home'
import { register } from 'api/account'
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
      Loading({
        state: true
      })
    }
  })
}

const registerAccount = function ({commit, state}, {item}) {
  register({item}).then(res => {
    console.log(res)
  })
}

export {
  poetryList,
  setPoetryItem,
  registerAccount
}
