const express = require('express')

const bodyParser = require('body-parser')

const cookirParse = require('cookie-parser')

const app = express()
const userRouter = require('./user')
const poetryRouter = require('./poetry')


const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
  socket.on('sendmsg', function (data) {
    io.emit('recvmsg', data)
  })
})

app.use(cookirParse())
app.use(bodyParser.urlencoded())

app.use('/poetry', poetryRouter)
app.use('/user', userRouter)

server.listen(9094, function(){
  console.log('Node app start at port  9094')
})
