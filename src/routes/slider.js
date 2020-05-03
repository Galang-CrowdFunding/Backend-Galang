const express = require('express')
const Route = express.Router()

const { uploadImage } = require('../controllers/upload')
const {insertSlider, getSlider, updateSlider, deleteSlider} = require('../controllers/slider')

Route
.post('/', uploadImage, insertSlider)
.get('/', getSlider)
.patch('/:id_slider', uploadImage, updateSlider)
.delete('/:id_slider', deleteSlider)
module.exports = Route