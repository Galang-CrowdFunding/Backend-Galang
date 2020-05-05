const projectModel = require('../models/project')
const miscHelper = require('../helpers')
const uid = require('uid')
const { IP, port } = require('../configs/index')
require('dotenv/config')

module.exports = {
  getAllProject: async (request, response) => {
    try {
      const searchName = request.query.searchName || ''
      const sort = request.query.sort || 'tb_project.project_name'
      const type = request.query.type || 'ASC'
      const pagequery = request.query.page || 1
      const page = (pagequery - 1) || 0
      const limit = request.query.limit || 1
      const data = {
        searchName,
        sort,
        type,
        page,
        limit
      }
      const totalData = await projectModel.count(data)
      const result = await projectModel.getAllProject(data)
      const totalPages = Math.ceil(totalData / limit)
      const pager = {
        totalPages
      }
      miscHelper.customResponse(response, 200, result, pager)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 400, 'Internal server error')
    }
  },
  insertProject: async (request, response) => {
    try {
      const id = uid()
      const req = request.body
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
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        status: req.status,
        date_created: new Date(),
        date_updated: new Date()
      }
      const result = await projectModel.insertProject(data)
      miscHelper.response(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'insert data failed')
    }
  },

  updateProject: async (request, response) => {
    try {
      const id_project = request.params.projectId
      const req = request.body
      if(!request.file || Object.keys(request.file).length === 0 ) {
        const data = {
          project_name: req.project_name,
          id_admin: req.admin_id,
          project_description: req.project_description,
          project_location: req.project_location,
          start_date: new Date(),
          end_date: req.end_date,
          goal: req.goal,
          total_donors: req.total_donors,
          status: req.status,
          date_updated: new Date()
        }
        const result = await projectModel.updateProject(data, id_project)
        miscHelper.response(response, 200, result)
      }  else {
      const data = {
        project_name: req.project_name,
        id_admin: req.admin_id,
        project_description: req.project_description,
        project_location: req.project_location,
        start_date: new Date(),
        end_date: req.end_date,
        goal: req.goal,
        total_donors: req.total_donors,
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        status: req.status,
        date_updated: new Date()
      }
      const result = await projectModel.updateProject(data, id_project)
      miscHelper.response(response, 200, result)}
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Internal server error!')
    }
  },
deleteProject: async (request, response) => {
  try {
    const id_project = request.params.projectId
    console.log(id_project, 'idproject')
    const result = await projectModel.deleteProject (id_project)
    miscHelper.response(response, 200, result)
  } catch (error){
    miscHelper.customErrorResponse(response, 404, 'Internal Server Error' )
  }
}
}
