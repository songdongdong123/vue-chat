import * as types from './mutation-types'
import { getPoetryList, addPoetryItem } from 'api/home'
const poetryList = function ({commit, state}) {
  getPoetryList({}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      commit(types.SET_POETRY_LIST, res.data.data)
    } else {
      commit(types.SET_POETRY_LIST, [])
    }
  })
}

const setPoetryItem = function ({commit, state}, {item}) {
  addPoetryItem({item}).then(res => {
    const poetryList = state.poetryList.concat(item)
    commit(types.SET_POETRY_ITEM, item)
    commit(types.SET_POETRY_LIST, poetryList)
  })
}

export {
  poetryList,
  setPoetryItem
}
