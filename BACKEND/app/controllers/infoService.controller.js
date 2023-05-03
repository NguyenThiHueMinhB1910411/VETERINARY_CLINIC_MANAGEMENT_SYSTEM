const InfoServiceService = require("../services/inforService.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const infoServiceService = new InfoServiceService(MongoDB.client);
    documents = await infoServiceService.getAllInfoService();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất InfoService"));
  }

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const infoServiceService = new InfoServiceService(MongoDB.client);
    documents = await infoServiceService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất InfoService"));
  }

  return res.send(documents);
};
