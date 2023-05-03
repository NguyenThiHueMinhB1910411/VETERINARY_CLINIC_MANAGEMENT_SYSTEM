const StaffService = require("../services/staff.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const staffService = new StaffService(MongoDB.client);
    documents = await staffService.getAllStaff();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất staff"));
  }

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const staffService = new StaffService(MongoDB.client);
    documents = await staffService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất sinh viên"));
  }

  return res.send(documents);
};

exports.create = async (req, res, next) => {

  try {
    console.log(req.body);
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.create(req.files.file, req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất staff"));
  }

};

exports.update = async (req, res, next) => {

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu để cập nhật không được rỗng"));
  }
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.update(req.params.id, req.body);
    console.log(req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy staff"));
    }
    return res.send({ message: "staff đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật biễu mẫu với id=${req.params.id}`)
    );
  }
};
//delete //
exports.delete = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.delete(req.params.id);
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa staff với  id=${req.params.id}`)
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy staff"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất staff với id=${req.params.id}`
      )
    );
  }
};
