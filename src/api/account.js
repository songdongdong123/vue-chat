import * as axios from '../common/js/axios'

// 用户注册
const register = params => axios.post('/user/register', params)

// 用户登录
const login = params => axios.post('/user/login', params)

export {
  register,
  login
}
