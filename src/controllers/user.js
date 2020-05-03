const JWT = require('jsonwebtoken');
const uid = require('uid');
const helpers = require('../helpers');
const { JWT_KEY } = require('../configs');
const { IP, port } = require('../configs');
const userModel = require('../models/user');
const helper = require('../helpers');

module.exports = {
  getUser: async (request, response) => {
    try {
      const result = await userModel.getUser();
      helpers.response(response, 200, result);
    } catch (error) {
      helpers.customErrorResponse(response, 404, 'user not found');
    }
  },

  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18);
      const hashPassword = helper.setPassword(request.body.password, salt);
      const idUser = uid();
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          id_user: idUser,
          name: request.body.name,
          email: request.body.email,
          password: hashPassword.passwordHash,
          salt: hashPassword.salt,
          total_amount: request.body.total_amount,
          image: `${IP}:${port}/uploads/user.png`,
          status: request.body.status || '2',
          date_created: new Date(),
          date_updated: new Date(),
        };
        const result = await userModel.register(data);
        helpers.response(response, 200, data);
      }
      const data = {
        id_user: idUser,
        name: request.body.name,
        email: request.body.email,
        password: hashPassword.passwordHash,
        salt: hashPassword.salt,
        total_amount: request.body.total_amount,
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        status: request.body.status || '2',
        date_created: new Date(),
        date_updated: new Date(),
      };
      const walletData = {
        id_dompet: uid(),
        id_user: idUser,
        balance: 0,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await userModel.register(data, walletData);
      helpers.response(response, 200, data);
    } catch (error) {
      helpers.customErrorResponse(response, 400, 'Register fail email has already added');
    }
  },

  updateData: async (request, response) => {
    try {
      const { userId } = request.params;
      const salt = helper.generateSalt(18);

      const hashPassword = helper.setPassword(request.body.password, salt);
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          name: request.body.name,
          email: request.body.email,
          password: hashPassword.passwordHash,
          salt: hashPassword.salt,
          total_amount: request.body.total_amount,
          image: `${IP}:${port}/uploads/user.png`,
          status: request.body.status || '2',
          date_updated: new Date(),
        };
        const result = await userModel.updateData(data, userId);
        const newData = {
          ...data,
          id_user: userId,
        };
        helpers.response(response, 200, newData);
      }

      const data = {
        name: request.body.name,
        email: request.body.email,
        password: hashPassword.passwordHash,
        salt: hashPassword.salt,
        total_amount: request.body.total_amount,
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        status: request.body.status || '2',
        date_updated: new Date(),
      };
      const result = await userModel.updateData(data, userId);
      const newData = {
        ...data,
        id_user: userId,
      };
      helpers.response(response, 200, newData);
    } catch (error) {
      helpers.customErrorResponse(response, 400, 'Fail update user');
    }
  },

  deleteData: async (request, response) => {
    try {
      const { userId } = request.params;
      const result = await userModel.deleteData(userId);
      helpers.response(response, 200, userId);
    } catch (error) {
      helpers.customErrorResponse(response, 400, 'Fail delete');
    }
  },

  login: async (request, response) => {
    try {
      const data = {
        password: request.body.password,
        email: request.body.email,
      };
      const emailValid = await userModel.checkEmail(data.email);
      const dataUser = emailValid[0];
      const hashPassword = helper.setPassword(data.password, dataUser.salt);
      if (hashPassword.passwordHash === dataUser.password && emailValid.length > 0) {
        const token = JWT.sign(
          {
            email: dataUser.email,
            id_user: dataUser.id_user,
          },
          JWT_KEY,
          { expiresIn: '9h' }
        );
        delete dataUser.salt;
        delete dataUser.password;
        dataUser.token = token;
        response.json(dataUser);
      } else {
        helpers.customErrorResponse(response, 400, 'wrong password');
      }
    } catch (error) {
      helpers.customErrorResponse(response, 400, 'email not found');
    }
  },
};
