const express = require('express')

const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)

app.listen(9094, function(){
  console.log('Node app start at port  9094')
})
