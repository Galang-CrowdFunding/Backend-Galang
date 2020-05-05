const connection = require('../configs/mysql');

module.exports = {
  getSlider: () =>
    new Promise((resolve, reject) => {
      connection.query(
        'SELECT tb_slider.*, tb_project.project_name FROM tb_slider LEFT JOIN tb_project ON tb_slider.id_project = tb_project.id_project',
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    }),
  insertSlider: data =>
    new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_slider SET ?', data, (error, result) => {
        if (error) reject(new Error(error));
        connection.query(
          'SELECT tb_slider.*, tb_project.project_name FROM tb_slider LEFT JOIN tb_project ON tb_slider.id_project = tb_project.id_project',
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      });
    }),
  updateSlider: data =>
    new Promise((resolve, reject) => {
      connection.query('UPDATE tb_slider SET ? WHERE id_slider = ?', [data, data.id_slider], (error, result) => {
        if (error) reject(new Error(error));
        connection.query(
          'SELECT tb_slider.*, tb_project.project_name FROM tb_slider LEFT JOIN tb_project ON tb_slider.id_project = tb_project.id_project',
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      });
    }),
  deleteSlider: id_slider =>
    new Promise((resolve, reject) => {
      connection.query('DELETE FROM tb_slider WHERE id_slider = ?', id_slider, (error, result) => {
        if (error) reject(new Error(error));
        connection.query(
          'SELECT tb_slider.*, tb_project.project_name FROM tb_slider LEFT JOIN tb_project ON tb_slider.id_project = tb_project.id_project',
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      });
    }),
};
