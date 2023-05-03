const ServiceService = require("../services/service.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const serviceService = new ServiceService(MongoDB.client);
    documents = await serviceService.getAllService();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất DV"));
  }
};

exports.findByName = async (req, res, next) => {
  let documents = [];

  try {
    console.log(req.body);
    const serviceService = new ServiceService(MongoDB.client);
    documents = await serviceService.getByName(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất DV"));
  }
};
exports.create = async (req, res, next) => {

  try {
    console.log(req.body);
    const serviceService = new ServiceService(MongoDB.client);
    const document = await serviceService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất service"));
  }

};

exports.findOne = async (req, res, next) => {
  try {
    const serviceService = new ServiceService(MongoDB.client,)
    const document = await serviceService.findById(
      req.params.id,
    )
    if (!document) {
      return next(
        new ApiError(404, 'Không tìm thấy  ServiceService'),
      )
    }
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất  ServiceService với id=${req.params.id}`,
      ),
    )
  }
}
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const serviceService = new ServiceService(MongoDB.client);
    documents = await serviceService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất sinh viên"));
  }

  return res.send(documents);
};
