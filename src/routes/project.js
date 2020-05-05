const Route = require('express').Router();

const { insertProject, getAllProject, deleteProject, updateProject } = require('../controllers/project');
const { uploadImages } = require('../controllers/upload');

Route.post('/', uploadImages, insertProject)
  .get('/', getAllProject)
  .delete('/:projectId', deleteProject)
  .patch('/:projectId', uploadImages, updateProject);
module.exports = Route;
