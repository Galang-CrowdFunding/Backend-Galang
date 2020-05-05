const connection = require('../configs/mysql');

module.exports = {
  getWalletHistory: () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT tb_user.name, tb_user.email, tb_dompet_history.* FROM tb_dompet_history JOIN tb_dompet ON tb_dompet.id_dompet = tb_dompet_history.id_dompet JOIN tb_user ON tb_user.id_user = tb_dompet.id_user`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  getWalletHistoryByDompetId: dompetId =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tb_dompet_history WHERE id_dompet = ?`, dompetId, (error, result) => {
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
  deleteWalletHistory: walletHistoryId =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM tb_dompet_history WHERE id_dompet_history = ?`,
        walletHistoryId,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  deleteWalletHistoryByDompetId: DompetId =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM tb_dompet_history WHERE id_dompet = ?`, DompetId, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
