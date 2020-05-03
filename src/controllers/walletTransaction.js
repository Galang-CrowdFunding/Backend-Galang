const uid = require('uid');
const walletTransactionModel = require('../models/walletTransaction');
const helpers = require('../helpers');

module.exports = {
  // Transaction wallet
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
        const dataWalletHistory = {
          id_dompet_history: idDompetHistory,
          id_dompet,
          transaction_type: 'Add Balance',
          amount,
          date_created: currentDate,
        };
        await walletTransactionModel.updateWalletBalance(userId, dataWallet);
        await walletTransactionModel.addWalletHistory(dataWalletHistory);
        helpers.response(res, 200, { dataWallet, dataWalletHistory });
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
  userDonation: async (req, res) => {
    try {
      const { userId } = req.params;
      const { amount, idProject } = req.body;
      const { id_dompet, balance } = await walletTransactionModel.getWalletById(userId);
      const idDompetHistory = uid();
      const idDonationHistory = uid();
      const currentDate = new Date();
      if (balance != undefined && balance > amount) {
        const dataWallet = {
          balance: balance - parseFloat(amount),
          date_updated: currentDate,
        };
        const dataWalletHistory = {
          id_dompet_history: idDompetHistory,
          id_dompet,
          transaction_type: 'Giving Donations',
          amount,
          date_created: currentDate,
        };
        const dataDonationHistory = {
          id_donation_history: idDonationHistory,
          id_user: userId,
          id_project: idProject,
          amount,
          date_created: currentDate,
        };
        await walletTransactionModel.updateWalletBalance(userId, dataWallet);
        await walletTransactionModel.addWalletHistory(dataWalletHistory);
        await walletTransactionModel.addDonationHistory(dataDonationHistory);
        helpers.response(res, 200, { dataWallet, dataWalletHistory, dataDonationHistory });
      } else {
        helpers.customErrorResponse(res, 400, `Your wallet balance is not enough!`);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
};
