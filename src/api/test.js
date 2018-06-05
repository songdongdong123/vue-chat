import * as axios from '../common/js/axios.js'

// const getUserList = params => axios.get('/index.php/address/getFistRollPic', params)

const register = params => axios.post('/user/register', params)

export {
  register
}
