import * as axios from '../common/js/axios.js'

const getPoetryDetail = params => axios.post('/user/searchPoetryDetail', params)

const getPoetryBrief = params => axios.post('/poetry/getPoetryBrief', params)

export {
  getPoetryDetail,
  getPoetryBrief
}
