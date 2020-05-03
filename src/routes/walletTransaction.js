const Route = require('express').Router();

const { addWalletBalance, userDonation } = require('../controllers/walletTransaction');

Route.post('/addWalletBallance/:userId', addWalletBalance).post('/userDonation/:userId', userDonation);

module.exports = Route;
