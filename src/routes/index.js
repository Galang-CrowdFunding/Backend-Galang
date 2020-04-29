const express = require('express')
const Route = express.Router()
const projectRouter = require('./project')

Route
.use('/project', projectRouter)
module.exports = Route