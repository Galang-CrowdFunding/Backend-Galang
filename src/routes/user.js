const Route = require('express').Router();

const { register, login, getUser, updateData, deleteData } = require('../controllers/user');
const { uploadImages } = require('../controllers/upload');

Route.get('/', getUser)
  .post('/register', uploadImages, register)
  .post('/login', login)
  .patch('/:userId', uploadImages, updateData)
  .delete('/:userId', deleteData);

module.exports = Route;
