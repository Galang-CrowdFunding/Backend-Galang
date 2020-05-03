const connection = require('../configs/mysql');

module.exports = {
  // Wallet
  createWallet: walletData =>
    new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_dompet SET ?', walletData, (error, result) => {
        console.log(error);

        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
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
  // Wallet history
  addWalletHistory: dataWalletHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_dompet_history SET ?`, dataWalletHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  // Donation
  addDonationHistory: dataDonationHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_donation_history SET ?`, dataDonationHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
