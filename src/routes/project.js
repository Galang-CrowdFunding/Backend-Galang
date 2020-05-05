const express = require('express')
const Route = express.Router()
const { uploadImage } = require('../controllers/upload')

const { insertProject, getAllProject, deleteProject, updateProject } = require('../controllers/project')

Route
  .post('/', uploadImage, insertProject)
  .get('/', getAllProject)
  .delete('/:projectId', deleteProject)
  .patch('/:projectId', uploadImage, updateProject)
module.exports = Route
