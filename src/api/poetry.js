import * as axios from '../common/js/axios.js'

const getPoetryDetail = params => axios.post('/user/searchPoetryDetail', params)

export {
  getPoetryDetail
}
