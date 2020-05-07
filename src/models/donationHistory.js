const connection = require('../configs/mysql');

module.exports = {
  getDonationHistory: () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT tb_user.name, tb_user.email, tb_project.project_name, tb_donation_history.* FROM tb_dompet JOIN tb_user ON tb_user.id_user = tb_dompet.id_user JOIN tb_donation_history ON tb_user.id_user = tb_donation_history.id_user JOIN tb_project ON tb_donation_history.id_project = tb_project.id_project`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  getDonationHistoryById: userId =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT tb_project.project_name, tb_donation_history.* FROM tb_donation_history JOIN tb_project ON tb_donation_history.id_project = tb_project.id_project WHERE id_user = ?`,
        userId,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
    getDonationSum: () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT id_project, SUM(amount) AS total, COUNT(id_project) as donatur FROM tb_donation_history  where status ='BERHASIL' GROUP BY id_project`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
    addDonationHistory: dataDonationHistory =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO tb_donation_history SET ?`, dataDonationHistory, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
  deleteDonationHistory: donationHistoryId =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE from tb_donation_history WHERE id_donation_history = ?`,
        donationHistoryId,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  deleteDonationHistoryByUserId: userId =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE from tb_donation_history WHERE id_user = ?`, userId, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    }),
};
