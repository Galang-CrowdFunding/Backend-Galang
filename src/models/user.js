const connection = require('../configs/mysql');

module.exports = {
  getUser: name =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        tb_user.id_user,
        tb_user.name,
        tb_user.email,
        tb_user.project_supported,
        tb_user.total_amount,
        tb_user.image
        FROM
        tb_user
        `,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  register: (data, walletData) =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tb_user WHERE email = ?', data.email, (error, result) => {
        if (result.length > 0) {
          reject(new Error(error));
        } else {
          connection.query('INSERT INTO tb_user SET ?', data, (error, result) => {
            if (error) reject(new Error(error));
            connection.query('INSERT INTO tb_dompet SET ?', walletData, (error, result) => {
              if (error) reject(new Error(error));
              resolve(result);
            });
          });
        }
      });
    }),
  updateData: (data, userId) =>
    new Promise((resolve, reject) => {
      connection.query('UPDATE tb_user SET ? WHERE id_user = ?', [data, userId], (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  deleteData: userId =>
    new Promise((resolve, reject) => {
      connection.query('DELETE FROM tb_user WHERE id_user = ?', userId, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  checkEmail: email =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tb_user WHERE email = ?', email, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
