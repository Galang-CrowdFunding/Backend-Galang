const connection = require('../configs/mysql');

module.exports = {
  createWallet: walletData =>
    new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_dompet SET ?', walletData, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  getWallet: () =>
    new Promise((resolve, reject) => {
      connection.query(
        'SELECT tb_user.name, tb_user.email, tb_dompet.* FROM tb_dompet JOIN tb_user ON tb_user.id_user = tb_dompet.id_user',
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
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
  deleteWallet: idUser =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM tb_dompet WHERE id_user = ?`, idUser, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result[0]);
      });
    }),
};
