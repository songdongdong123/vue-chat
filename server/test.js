const express = require('express')

const app = express()

const Router = express.Router()

Router.get('/test', function(req, res) {
  return res.json({
    code: 0,
    data: 'hello world!'
  })
})

app.use('/testRouter', Router)

app.listen(3001, function() {
  console.log('express server is success')
});