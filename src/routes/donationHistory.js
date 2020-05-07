const Route = require('express').Router();

const {
  getDonationHistory,
  getDonationHistoryById,
  getDonationSum,
  deleteDonationHistory,
  deleteDonationHistoryByUserId,
} = require('../controllers/donationHistory');

Route
  .get('/donation/', getDonationHistory)
  .get('/:userId', getDonationHistoryById)
  .get('/sum', getDonationSum)
  .delete('/:donationHistoryId', deleteDonationHistory)
  .delete('/deleteByUserId/:userId', deleteDonationHistoryByUserId);

module.exports = Route;
