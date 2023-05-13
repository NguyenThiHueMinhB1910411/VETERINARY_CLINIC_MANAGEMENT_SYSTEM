const AccountService = require("../services/account.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");




exports.login = async (req, res, next) => {
  try {
    const accountService = new AccountService(MongoDB.client);
    const document = await accountService.login(req.body);
    if (document != null) {
      return res.send(document);
    } else {
      return res.send({ error: true });
    }
  } catch (error) {
    return next(
      new ApiError(500, "Lỗi trong khi đăng nhập")
    );
  }
};

exports.create = async (req, res, next) => {

  try {
    console.log(req.body);
    const accountService= new AccountService(MongoDB.client);
    const documents = await accountService.create(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất doctor"));
  }

};
exports.findOne = async (req, res, next) => {
  try {
    console.log(321);
    const accountService = new AccountService(MongoDB.client);
    const document = await accountService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy tài khoản"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi truy xuất với id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const accountService = new AccountService(MongoDB.client);
    const document = await accountService.delete(req.params.id);
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa Doctor với  id=${req.params.id}`)
    );
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
    const accountService = new AccountService(MongoDB.client);
    const document = await accountService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy Account"));
    }
    return res.send({ message: "Account đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật biễu mẫu với id=${req.params.id}`)
    );
  }
  console.log(45);
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const accountService = new AccountService(MongoDB.client);
    documents = await accountService.getAllAccount();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi truy xuất doctor"));
  }
  

};

exports.register = async (req, res, next) => {

  try {
    console.log(req.body);
    const accountService = new AccountService(MongoDB.client);
    const documents = await accountService.register(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất registrationInformation"));
  }

};
