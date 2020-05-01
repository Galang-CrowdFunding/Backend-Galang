const express = require('express')
const Route = express.Router()

const { uploadImage } = require('../controllers/upload')
const {insertSlider, getSlider} = require('../controllers/slider')

Route
.post('/', uploadImage, insertSlider)
.get('/', getSlider)
module.exports = Route