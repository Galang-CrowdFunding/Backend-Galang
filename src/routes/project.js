const Route = require('express').Router();

<<<<<<< HEAD
const { insertProject, getAllProject, deleteProject, updateProject } = require('../controllers/project')

Route
  .post('/', uploadImage, insertProject)
  .get('/', getAllProject)
  .delete('/:projectId', deleteProject)
  .patch('/:projectId', uploadImage, updateProject)
module.exports = Route
=======
const { uploadImages } = require('../controllers/upload');
const { insertProject, getAllProject } = require('../controllers/project');

Route.post('/', uploadImages, insertProject).get('/', getAllProject);

module.exports = Route;
>>>>>>> 4dc72463c531c9a9b6d632c4dd3def5fd856a18e
