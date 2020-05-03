const Route = require('express').Router();

const { uploadImages } = require('../controllers/upload');
const { insertProject, getAllProject } = require('../controllers/project');

Route.post('/', uploadImages, insertProject).get('/', getAllProject);

module.exports = Route;
