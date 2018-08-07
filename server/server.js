const express = require('express')

const bodyParser = require('body-parser')

const cookirParse = require('cookie-parser')
const sequelize = require('./db')
const chat = sequelize.model('chat')
const account = sequelize.model('account')

const app = express()
const userRouter = require('./user')
const poetryRouter = require('./poetry')


const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
  socket.on('sendmsg', function (data) {
    const {form, to, msg} = data
    const chatid = [form,to].sort().join('_')
    chat.create({chatid, form, to, content: msg}).then(doc => {
      chat.findOne({
        include:[{
          model: account
        }],
        'where': {'id': doc.id}
      }).then(res => {
        const chatmsg = {
          account: res.account,
          chatid: doc.chatid,
          form: form,
          to: to,
          content: msg,
          created_at: doc.created_at
        }
        // console.log('1')
        io.emit('recvemsg', chatmsg)
      })
    })
  })
})

app.use(cookirParse())
app.use(bodyParser.urlencoded())

app.use('/poetry', poetryRouter)
app.use('/user', userRouter)

server.listen(9094, function(){
  console.log('Node app start at port  9094')
})
