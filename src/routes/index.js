const express = require('express');

const Route = express.Router();

const userRoute = require('./user');
const projectRouter = require('./project');
const sliderRoute = require('./slider');
const walletRoute = require('./wallet');
const walletHistoryRoute = require('./walletHistory');
const donationHistoryRoute = require('./donationHistory');

Route.use('/user', userRoute)
  .use('/project', projectRouter)
  .use('/uploads', express.static('./uploads'))
  .use('/slider', sliderRoute)
  .use('/wallet', walletRoute)
  .use('/walletHistory', walletHistoryRoute)
  .use('/donationHistory', donationHistoryRoute);

module.exports = Route;
