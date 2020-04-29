const express = require('express')
const Route = express.Router()

const {
  register
} = require('../controllers/user')
const { uploadImage } = require('../controllers/upload')

Route
  .post('/register', uploadImage, register)

module.exports = Route
