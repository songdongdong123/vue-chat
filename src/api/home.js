import * as axios from '../common/js/axios.js'

// const getUserList = params => axios.get('/index.php/address/getFistRollPic', params)

const getPoetryList = params => axios.get('/user/getPoetryList', params)

export {
  getPoetryList
}
