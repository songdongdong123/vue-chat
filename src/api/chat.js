import * as axios from '../common/js/axios'

const getChatMsgList = params => axios.post('/user/getChatMsgList', params)

const readMsg = params => axios.post('/user/readMsg', params)

export {
  getChatMsgList,
  readMsg
}
