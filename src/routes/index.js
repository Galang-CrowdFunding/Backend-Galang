const express = require('express')
const Route = express.Router()

const userRoute = require('./user')
const projectRouter = require('./project')

Route
  .use('/user', userRoute)
  .use('/project', projectRouter)
  .use('/uploads', express.static('./uploads'))

module.exports = Route
