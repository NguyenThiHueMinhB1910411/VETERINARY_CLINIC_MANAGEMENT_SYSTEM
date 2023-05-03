const CustomerService = require("../services/customer.service.js");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const customerService = new CustomerService(MongoDB.client);
    documents = await customerService.getAllCustomer();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất Customer"));
  }

};
exports.findAllForm = async (req, res, next) => {
  let documents = [];

  try {
    const customerService = new CustomerService(MongoDB.client);
    documents = await customerService.findAllForm({});
    console.log(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất Customer"));
  }

  return res.send(documents);
};
