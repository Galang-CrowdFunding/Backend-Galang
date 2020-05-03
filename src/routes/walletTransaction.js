const Route = require('express').Router();

const { addWalletBalance } = require('../controllers/walletTransaction');

Route.post('/addWalletBallance/:userId', addWalletBalance);

module.exports = Route;
