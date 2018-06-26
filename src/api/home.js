import * as axios from '../common/js/axios.js'

// 发表骚话
const addPoetryItem = params => axios.post('/user/addPoetryItem', params)

// 获取骚话列表
const getPoetryList = params => axios.get('/user/getPoetryList', params)

// 点赞骚话
const linkThisPoetry = params => axios.post('/user/linkThisPoetry', params)

export {
  getPoetryList,
  addPoetryItem,
  linkThisPoetry
}
