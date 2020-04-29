const connection = require('../configs/mysql')

module.exports = {
    insertProject: (data) => {
        return new Promise((resolve, reject) =>
            connection.query('INSERT INTO tb_project SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        )
    }
}