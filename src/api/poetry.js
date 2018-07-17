import * as axios from '../common/js/axios.js'

const getPoetryDetail = params => axios.post('/user/searchPoetryDetail', params)

const getPoetryBrief = params => axios.post('/poetry/getPoetryBrief', params)

const getTransmitList = params => axios.post('/poetry/getTransmitList', params)

const getSupportList = params => axios.post('/poetry/getSupportList', params)

const subscription = params => axios.post('/poetry/subscription', params)

const getUserAttentionlist = params => axios.get('/poetry/getUserAttentionlist', params)

const getUserFans = params => axios.get('/poetry/getUserFans', params)

export {
  getPoetryDetail,
  getPoetryBrief,
  getTransmitList,
  getSupportList,
  subscription,
  getUserAttentionlist,
  getUserFans
}
