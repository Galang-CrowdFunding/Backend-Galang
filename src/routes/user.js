const Route = require('express').Router();

const { register } = require('../controllers/user');
const { uploadImages } = require('../controllers/upload');

Route.post('/register', uploadImages, register);

module.exports = Route;
