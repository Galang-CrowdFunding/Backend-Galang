const Route = require('express').Router();

const {
  getWalletHistory,
  getWalletHistoryByDompetId,
  deleteWalletHistory,
  deleteWalletHistoryByDompetId,
} = require('../controllers/wallerHistory');

Route.get('/', getWalletHistory)
  .get('/:dompetId', getWalletHistoryByDompetId)
  .delete('/:WalletHistoryId', deleteWalletHistory)
  .delete('/deleteByDompetId/:dompetId', deleteWalletHistoryByDompetId);

module.exports = Route;
