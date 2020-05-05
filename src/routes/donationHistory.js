const Route = require('express').Router();

const {
  getDonationHistory,
  getDonationHistoryById,
  deleteDonationHistory,
  deleteDonationHistoryByUserId,
} = require('../controllers/donationHistory');

Route.get('/', getDonationHistory)
  .get('/:userId', getDonationHistoryById)
  .delete('/:donationHistoryId', deleteDonationHistory)
  .delete('/deleteByUserId/:userId', deleteDonationHistoryByUserId);

module.exports = Route;
