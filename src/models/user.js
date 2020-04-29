const connection = require('../configs/mysql')

module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM tb_user WHERE email = ?',
        data.email,
        (error, result) => {
          if (result.length > 0) {
            reject(new Error(error))
          } else {
            connection.query(
              'INSERT INTO tb_user SET ?',
              data,
              (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
              }
            )
          }
        }
      )
    })
  }
}
