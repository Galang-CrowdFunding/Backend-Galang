const connection = require('../configs/mysql');

module.exports = {
  getWalletById: userId =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tb_dompet WHERE id_user = ?`, userId, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result[0]);
      });
    }),
  updateWalletBalance: (userId, dataWallet) =>
    new Promise((resolve, reject) => {
      connection.query(`UPDATE tb_dompet SET ? WHERE id_user = ?`, [dataWallet, userId], (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  addWalletHistory: dataWalletHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_dompet_history SET ?`, dataWalletHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  addDonationHistory: dataDonationHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_donation_history SET ?`, dataDonationHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
