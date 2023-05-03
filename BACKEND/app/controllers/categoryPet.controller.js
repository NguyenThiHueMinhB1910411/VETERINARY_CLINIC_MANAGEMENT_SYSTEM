const CategoryPetService = require("../services/categoryPet.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const categoryPetService = new CategoryPetService(MongoDB.client);
    documents = await categoryPetService.getAllCategoryPet();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất categoryPet"));
  }

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const categoryPetService = new CategoryPetService(MongoDB.client);
    documents = await categoryPetService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất sinh viên"));
  }

  return res.send(documents);
};
