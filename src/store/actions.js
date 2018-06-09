import * as types from './mutation-types'
import { Loading } from '../Plugins/index'
import { getPoetryList, addPoetryItem } from 'api/home'
const poetryList = function ({commit, state}) {
  Loading({
    state: true
  })
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
  Loading({
    state: true
  })
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

export {
  poetryList,
  setPoetryItem
}
