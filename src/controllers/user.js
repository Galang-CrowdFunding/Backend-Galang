const userModel = require('../models/user')
const helper = require('../helpers')
const helpers = require('../helpers')
const { IP, port } = require('../configs')

module.exports = {

  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18)
      const hashPassword = helper.setPassword(request.body.password, salt)
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          name: request.body.name,
          email: request.body.email,
          password: hashPassword.passwordHash,
          salt: hashPassword.salt,
          project_supported: request.body.project_supported,
          total_amount: request.body.total_amount,
          image: `${IP}:${port}/uploads/user.png`,
          status: request.body.status || '2',
          date_created: new Date(),
          date_updated: new Date()
        }
        const result = await userModel.register(data)
        helpers.response(response, 200, data)
      } const data = {
        name: request.body.name,
        email: request.body.email,
        password: hashPassword.passwordHash,
        salt: hashPassword.salt,
        project_supported: request.body.project_supported,
        total_amount: request.body.total_amount,
        image: `${IP}:${port}/uploads/${request.file.fileName}`,
        status: request.body.status || '2',
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await userModel.register(data)
      helpers.response(response, 200, data)
    } catch (error) {
      helpers.customErrorResponse(
        response,
        400,
        'Register fail email has already added'
      )
    }
  }
}
