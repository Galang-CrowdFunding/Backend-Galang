const express = require('express')
const Route = express.Router()

const userRoute = require('./user')
const projectRouter = require('./project')
const sliderRoute = require('./slider')

Route
  .use('/user', userRoute)
  .use('/project', projectRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/slider', sliderRoute)

module.exports = Route
