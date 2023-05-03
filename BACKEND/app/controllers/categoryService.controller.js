const CategoryServiceService = require("../services/categoryService.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const categoryServiceService = new CategoryServiceService(MongoDB.client);
    documents = await categoryServiceService.getAllCategoryService();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất categoryService"));
  }

};

exports.findOne = async (req, res, next) => {
  try {
    console.log(123)
    const categoryServiceService = new CategoryServiceService(
      MongoDB.client,
    )
    const document = await categoryServiceService.findById(
      req.params.id,
    )
    if (!document) {
      return next(
        new ApiError(404, 'Không tìm thấy  categoryServiceService'),
      )
    }
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất  categoryServiceService với id=${req.params.id}`,
      ),
    )
  }
}
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const categoryServiceService = new CategoryServiceService(MongoDB.client);
    documents = await categoryServiceService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất sinh viên"));
  }

  return res.send(documents);
};
