const sliderModel = require("../models/slider");
const miscHelper = require("../helpers");
const uid = require("uid");
const { IP, port } = require("../configs/index");
require("dotenv/config");

module.exports = {
  getSlider: async (request, response) => {
    try {
      const result = await sliderModel.getSlider();
      miscHelper.response(response, 200, result);
    } catch (error) {
      miscHelper.customErrorResponse(response, 404, "Internal server error!");
    }
  },
  insertSlider: async (request, response) => {
    try {
      const id = uid();
      const data = {
        id_slider: id,
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        id_project: request.body.id_project,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await sliderModel.insertSlider(data);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Insert data failed");
    }
  },
  updateSlider: async (request, response) => {
    try {
      const id_slider = request.params.id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          id_slider,
          id_project: request.body,
          date_updated: new Date(),
        };
        const result = await sliderModel.updateSlider(data);
        return miscHelper.response(response, 200, result);
      }
      const data = {
        id_slider,
        image: `${IP}:${port}/uploads/${request.file.filename}`,
        id_project: request.body,
        date_updated: new Date(),
      };
      const result = await sliderModel.updateSlider(data);
      return miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Update data failed");
    }
  },
};
