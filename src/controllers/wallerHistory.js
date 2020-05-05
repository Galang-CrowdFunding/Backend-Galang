const walletHistoryModel = require('../models/walletHistory');
const helpers = require('../helpers');

module.exports = {
  getWalletHistory: async (req, res) => {
    try {
      const result = await walletHistoryModel.getWalletHistory();
      helpers.response(res, 200, result);
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },

  getWalletHistoryByDompetId: async (req, res) => {
    try {
      const { dompetId } = req.params;
      const result = await walletHistoryModel.getWalletHistoryByDompetId(dompetId);
      helpers.response(res, 200, result);
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },

  deleteWalletHistory: async (req, res) => {
    try {
      const { WalletHistoryId } = req.params;
      const result = await walletHistoryModel.deleteWalletHistory(WalletHistoryId);
      if (result.affectedRows <= 0) {
        helpers.response(res, 400, 'Delete failed. Data not found!');
      } else {
        helpers.response(res, 200, WalletHistoryId);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, 'Fail delete');
    }
  },

  deleteWalletHistoryByDompetId: async (req, res) => {
    try {
      const { dompetId } = req.params;
      const result = await walletHistoryModel.deleteWalletHistoryByDompetId(dompetId);
      if (result.affectedRows <= 0) {
        helpers.response(res, 400, 'Delete failed. Data not found!');
      } else {
        helpers.response(res, 200, dompetId);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, 'Fail delete');
    }
  },
};
