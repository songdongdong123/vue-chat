import * as types from './mutation-types'

const mutations = {
  [types.SET_POETRY_LIST] (state, list) {
    state.poetryList = list
  },
  [types.SET_POETRY_ITEM] (state, item) {
    state.poetryItem = item
  },
  [types.SET_USER_INFO] (state, userinfo) {
    state.userinfo = userinfo
  }
}

export default mutations
