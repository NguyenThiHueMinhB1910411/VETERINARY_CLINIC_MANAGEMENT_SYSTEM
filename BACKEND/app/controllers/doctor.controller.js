const DoctorService = require("../services/doctor.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const doctorService = new DoctorService(MongoDB.client);
    documents = await doctorService.getAllDoctor();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất doctor"));
  }
  

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const doctorService = new DoctorService(MongoDB.client);
    documents = await doctorService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất doctor "));
  }

  return res.send(documents);
};

exports.create = async (req, res, next) => {

  try {
    const doctorService = new DoctorService(MongoDB.client);
    const documents = await doctorService.create(req.files.file, req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất doctor"));
  }

};

exports.update = async (req, res, next) => {
  console.log(12345);
  console.log(req.body);
  console.log(req.params.id)
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu để cập nhật không được rỗng"));
  }
  try {
    const doctorService = new DoctorService(MongoDB.client);
    const document = await doctorService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy Doctor"));
    }
    return res.send({ message: "Doctor đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật biễu mẫu với id=${req.params.id}`)
    );
  }
  console.log(45);
};
//delete //
exports.delete = async (req, res, next) => {
  try {
    const doctorService = new DoctorService(MongoDB.client);
    const document = await doctorService.delete(req.params.id);
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa Doctor với  id=${req.params.id}`)
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const doctorService = new DoctorService(MongoDB.client);
    const document = await doctorService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy doctor"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất doctor với id=${req.params.id}`
      )
    );
  }
};