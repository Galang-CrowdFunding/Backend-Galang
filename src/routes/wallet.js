const Route = require('express').Router();

const { addWalletBalance, userDonation, getWallet, deleteWallet } = require('../controllers/wallet');

Route.get('/', getWallet)
  .post('/addWalletBallance/:userId', addWalletBalance)
  .post('/userDonation/:userId', userDonation)
  .delete('/:userId', deleteWallet);

module.exports = Route;
