const uid = require('uid');
const walletModel = require('../models/wallet');
const walletHistoryModel = require('../models/walletHistory');
const donationHistoryModel = require('../models/donationHistory');
const userModel = require('../models/user')
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
      const status = req.body.status || 'BERHASIL'
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
          status : status,
          id_user: userId,
          id_project: idProject,
          amount,
          date_created: currentDate,
        };
        const userDetails = await walletModel.getUserDetails(userId)
        const total_amount = parseFloat(userDetails[0].total_amount) + parseFloat(amount)
        const project_supported = userDetails[0].project_supported + 1
        const dataUser = {
          total_amount,
          project_supported
        }

        await walletModel.updateWalletBalance(userId, dataWallet);
        await walletHistoryModel.addWalletHistory(dataWalletHistory);
        await donationHistoryModel.addDonationHistory(dataDonationHistory);
        await userModel.updateUserDonation(dataUser, userId);
        helpers.response(res, 200, { dataWallet, dataWalletHistory, dataDonationHistory, userModel });
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
        await walletHistoryModel.deleteWalletHistoryByDompetId(id_dompet);
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
