const uid = require('uid');
const walletModel = require('../models/wallet');
const walletHistoryModel = require('../models/walletHistory');
const donationHistoryModel = require('../models/donationHistory');
const helpers = require('../helpers');

module.exports = {
  getWallet: async (req, res) => {
    try {
      const result = await walletModel.getWallet();
      helpers.response(res, 200, result);
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
  addWalletBalance: async (req, res) => {
    try {
      const { userId } = req.params;
      const { amount } = req.body;
      const { id_dompet, balance } = await walletModel.getWalletById(userId);
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
        await walletModel.updateWalletBalance(userId, dataWallet);
        await walletHistoryModel.addWalletHistory(dataWalletHistory);
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
      const { id_dompet, balance } = await walletModel.getWalletById(userId);
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
        await walletModel.updateWalletBalance(userId, dataWallet);
        await walletHistoryModel.addWalletHistory(dataWalletHistory);
        await donationHistoryModel.addDonationHistory(dataDonationHistory);
        helpers.response(res, 200, { dataWallet, dataWalletHistory, dataDonationHistory });
      } else {
        helpers.customErrorResponse(res, 400, `Your wallet balance is not enough!`);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
  deleteWallet: async (req, res) => {
    try {
      const { userId } = req.params;
      const { id_dompet } = await walletModel.getWalletById(userId);
      if (id_dompet != undefined) {
        await walletHistoryModel.deleteWalletHistory(id_dompet);
        await walletModel.deleteWallet(userId);
        helpers.response(res, 200, `Delete Success!`);
      } else {
        helpers.customErrorResponse(res, 400, `Id user not found!`);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },
};
