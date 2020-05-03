const express = require('express');

const Route = express.Router();

const { uploadImages } = require('../controllers/upload');
const { insertSlider, getSlider, updateSlider } = require('../controllers/slider');

Route.post('/', uploadImages, insertSlider)
  .get('/', getSlider)
  .patch('/:id_slider', updateSlider);
module.exports = Route;
