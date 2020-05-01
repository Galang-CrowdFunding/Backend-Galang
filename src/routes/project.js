const Route = require('express').Router();

const { uploadImage } = require('../controllers/upload');
const { insertProject, getAllProject } = require('../controllers/project');

Route.post('/', uploadImage, insertProject).get('/', getAllProject);

module.exports = Route;
