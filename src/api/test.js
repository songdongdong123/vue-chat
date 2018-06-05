import * as axios from '../common/js/axios.js'

const getTest = params => axios.get('/index.php/address/getFistRollPic', params)

const testMy = params => axios.get('/user/test', params)

export {
  getTest,
  testMy
}
