const connection = require('../configs/mysql');

module.exports = {
  count: data => {
    const name = data.seacrhName;
    const { limit } = data;
    const { page } = data;
    return new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as totalData FROM tb_project', (error, result) => {
        if (error) reject(new Error(error));
        resolve(result[0].totalData);
      });
    });
  },

  getAllProject: data => {
    const { sort } = data;
    const { type } = data;
    const name = data.searchName;
    const { page } = data;
    const { limit } = data;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM tb_project WHERE tb_project.project_name LIKE '%${name}%' ORDER BY ${sort} ${type} LIMIT ${page},${limit}`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  insertProject: data =>
    new Promise((resolve, reject) =>
      connection.query('INSERT INTO tb_project SET ?', data, (error, result) => {
        if (error) reject(new Error(error));
        connection.query('SELECT * FROM tb_project', (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        });
      })
    ),
  deleteProject: data =>
    new Promise((resolve, reject) =>
      connection.query('INSERT INTO tb_project SET ?', data, (error, result) => {
        if (error) reject(new Error(error));
        connection.query('SELECT * FROM tb_project', (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        });
      })
    ),
};
