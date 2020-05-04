const connection = require('../configs/mysql');

module.exports = {
  addDonationHistory: dataDonationHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_donation_history SET ?`, dataDonationHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
