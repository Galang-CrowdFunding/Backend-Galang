const Route = require('express').Router();

const { uploadImages } = require('../controllers/upload');
const { insertSlider, getSlider, updateSlider, deleteSlider } = require('../controllers/slider');

Route.post('/', uploadImages, insertSlider)
  .get('/', getSlider)
  .patch('/:id_slider', uploadImages, updateSlider)
  .delete('/:id_slider', deleteSlider);
module.exports = Route;
