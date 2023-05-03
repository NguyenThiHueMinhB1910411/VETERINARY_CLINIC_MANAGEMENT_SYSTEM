const PetService = require("../services/pet.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const petService = new PetService(MongoDB.client);
    documents = await petService.getAllPet();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất pet"));
  }

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const petService = new PetService(MongoDB.client);
    documents = await petService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất pet"));
  }

  return res.send(documents);
};
