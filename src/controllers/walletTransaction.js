const uid = require('uid');
const walletTransactionModel = require('../models/walletTransaction');
const helpers = require('../helpers');

module.exports = {
  addWalletBalance: async (req, res) => {
    try {
      const { userId } = req.params;
      const { amount } = req.body;
      const { id_dompet, balance } = await walletTransactionModel.getWalletById(userId);
      const idDompetHistory = uid();
      const currentDate = new Date();
      if (balance != undefined) {
        const dataWallet = {
          balance: balance + parseFloat(amount),
          date_updated: currentDate,
        };
        const dataHistoryWallet = {
          id_dompet_history: idDompetHistory,
          id_dompet,
          transaction_type: 'Add Balance',
          amount,
          date_created: currentDate,
        };
        await walletTransactionModel.addWalletBalance(userId, dataWallet);
        await walletTransactionModel.addWalletHistory(dataHistoryWallet);
        helpers.response(res, 200, [dataWallet, dataHistoryWallet]);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
};
