import * as axios from '../common/js/axios'

const sendComment = params => axios.post('/user/sendComment', params)

const getAllComments = params => axios.post('/user/getAllComments', params)

export {
  sendComment,
  getAllComments
}
