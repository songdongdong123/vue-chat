const express = require('express')

const Router = express.Router()

Router.get('/test', function (req, res) {
  return res.json({
    code: 1,
    arr: [{
      name: 123
    }]
  })
})


module.exports = Router