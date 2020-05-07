const donationHistoryModel = require('../models/donationHistory');
const helpers = require('../helpers');
const uid = require ('uid')

module.exports = {

  getDonationHistory: async (req, res) => {
    try {
      const result = await donationHistoryModel.getDonationHistory();
      helpers.response(res, 200, result);
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },

  getDonationHistoryById: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await donationHistoryModel.getDonationHistoryById(userId);
      helpers.response(res, 200, result);
    } catch (error) {
      helpers.customErrorResponse(res, 400, `${error}`);
    }
  },

  deleteDonationHistory: async (req, res) => {
    try {
      const { donationHistoryId } = req.params;
      const result = await donationHistoryModel.deleteDonationHistory(donationHistoryId);
      if (result.affectedRows <= 0) {
        helpers.response(res, 400, 'Delete failed. Data not found!');
      } else {
        helpers.response(res, 200, donationHistoryId);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, 'Fail delete');
    }
  },

  deleteDonationHistoryByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await donationHistoryModel.deleteDonationHistoryByUserId(userId);
      if (result.affectedRows <= 0) {
        helpers.response(res, 400, 'Delete failed. Data not found!');
      } else {
        helpers.response(res, 200, userId);
      }
    } catch (error) {
      helpers.customErrorResponse(res, 400, 'Fail delete');
    }
  },
};
