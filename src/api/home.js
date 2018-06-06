import * as axios from '../common/js/axios.js'

const addPoetryItem = params => axios.post('/user/addPoetryItem', params)

const getPoetryList = params => axios.get('/user/getPoetryList', params)

export {
  getPoetryList,
  addPoetryItem
}
