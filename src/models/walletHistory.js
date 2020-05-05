const connection = require('../configs/mysql');

module.exports = {
  addWalletHistory: dataWalletHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_dompet_history SET ?`, dataWalletHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  deleteWalletHistory: DompetId =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM tb_dompet_history WHERE id_dompet = ?`, DompetId, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
