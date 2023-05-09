const MedicalSuppliesService = require("../services/medicalSuppliesService.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const medicalSuppliesService = new MedicalSuppliesService(MongoDB.client);
    documents = await medicalSuppliesService.getAll();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất medicalSupplies"));
  }
  

};

exports.create = async (req, res, next) => {

  try {
    // console.log(req.body);
    const medicalSuppliesService = new MedicalSuppliesService(MongoDB.client);
    const documents = await medicalSuppliesService.create(req.files.file, req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất medicalSupplies"));
  }

};



exports.findOne = async (req, res, next) => {
  try {
    const medicalSuppliesService = new MedicalSuppliesService(MongoDB.client);
    const document = await medicalSuppliesService.findByNameMedical(req.body.service);
    console.log(document)
    // if (!document) {
    //   return next(new ApiError(404, "Không tìm thấy MedicalSuppliesService"));
    // }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất MedicalSuppliesService với id=${req.body.service}`
      )
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const medicalSuppliesService = new MedicalSuppliesService(MongoDB.client);
    const document = await medicalSuppliesService.delete(req.params.id);
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa medicalSuppliesService với  id=${req.params.id}`)
    );
  }
};
