const express = require('express')
const Route = express.Router()

const { uploadImages } = require('../controllers/upload')

const {insertProject} = require('../controllers/project')

Route
.post('/', uploadImages, insertProject)

module.exports = Route