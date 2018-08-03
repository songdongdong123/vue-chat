import * as axios from '../common/js/axios'

const getChatMsgList = params => axios.post('/user/getChatMsgList', params)

export {
  getChatMsgList
}
