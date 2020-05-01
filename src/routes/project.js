const Route = require('express').Router();

const { uploadImages } = require('../controllers/upload');
const { insertProject } = require('../controllers/project');

Route.post('/', uploadImages, insertProject);

module.exports = Route;
