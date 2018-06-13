import * as axios from '../common/js/axios'

// 用户注册
const register = params => axios.post('/user/register', params)

// 用户登录
const login = params => axios.post('/user/login', params)

// 完善用户信息
const updataUserInfo = params => axios.post('/user/updataUserInfo', params)

// 获取用户信息
const getUserInfo = params => axios.post('/user/getUserInfo', params)

export {
  register,
  login,
  updataUserInfo,
  getUserInfo
}
