const express = require('express');

const Route = express.Router();

const { uploadImage } = require('../controllers/upload');
const { insertSlider, getSlider, updateSlider } = require('../controllers/slider');

Route.post('/', uploadImage, insertSlider)
  .get('/', getSlider)
  .patch('/:id_slider', updateSlider);
module.exports = Route;
