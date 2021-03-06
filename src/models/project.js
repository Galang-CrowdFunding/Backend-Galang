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
  updateProject: (data, projectId) =>
    new Promise((resolve, reject) => {
      connection.query('UPDATE tb_project SET ? WHERE id_project = ?', [data, projectId], (error, result) => {
        if (error) reject(new Error(error));
        connection.query(`SELECT * FROM tb_project`, (error, result) => {
          if (error) reject(new Error(error));
          console.log('aaaaa', result);
          resolve(result);
        });
      });
    }),
  deleteProject: id =>
    new Promise((resolve, reject) =>
      connection.query('DELETE FROM tb_project WHERE id_project = ?', id, (error, result) => {
        if (error) reject(new Error(error));
        connection.query('SELECT * FROM tb_project', (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        });
      })
    ),
};
