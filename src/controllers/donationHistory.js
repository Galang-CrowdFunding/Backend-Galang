const donationHistoryModel = require('../models/donationHistory');
const helpers = require('../helpers');
const uid = require ('uid')

module.exports = {
  insertDonation: async (request, response) => {
    try {
      const id_donation_history = uid();
      const data = {
        id_donation_history,
        id_user = request.body.id_user,
        id_project = request.body.id_project,
        amount = request.body.amount,
        date_created = new Date()
      }
      const result = await donationHistoryModel.insertDonation(data);
      helpers.response(response, 200, result)
    } catch (error) {
      console.log(error);
      helpers.customErrorResponse(response, 404, 'insert data failed')
    }
  },

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
