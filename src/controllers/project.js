const uid = require('uid');
const projectModel = require('../models/project');
const miscHelper = require('../helpers');
const { ip, port } = require('../configs/index');
require('dotenv/config');

module.exports = {
  insertProject: async (request, response) => {
    try {
      const id = uid();
      const req = request.body;
      const data = {
        id_project: id,
        project_name: req.project_name,
        id_admin: req.admin_id,
        project_description: req.project_description,
        project_location: req.project_location,
        start_date: new Date(),
        end_date: req.end_date,
        goal: req.goal,
        total_donors: req.total_donors,
        image: `${ip}:${port}/uploads/${request.file.filename}`,
        status: req.status,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await projectModel.insertProject(data);
      miscHelper.response(response, 200, data);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, 'insert data failed');
    }
  },
};
