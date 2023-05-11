const RegistrationInformationService = require('../services/registrationInformation.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')

exports.findOne = async (req, res, next) => {
  try {
    // console.log(1111)
    console.log(req.params.id)
    const registrationInformationService = new RegistrationInformationService(
      MongoDB.client,
    )
    const document = await registrationInformationService.findById(
      req.params.id,
    )
    console.log(document)
    if (!document) {
      return next(
        new ApiError(404, 'Không tìm thấy  registrationInformationService'),
      )
    }
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất  registrationInformationService với id=${req.params.id}`,
      ),
    )
  }
}

exports.findAll = async (req, res, next) => {
  let documents = []
  try {
    const registrationInformationService = new RegistrationInformationService(
      MongoDB.client,
    )
    documents = await registrationInformationService.getAllInfo()
  } catch (error) {
    return next(
      new ApiError(
        500,
        'Đã xảy ra lỗi khi truy xuất registrationInformation',
      ),
    )
  }

  return res.send(documents)
}
exports.create = async (req, res, next) => {
  try {
    // console.log(req.body)
    const registrationInformationService = new RegistrationInformationService(
      MongoDB.client,
    )
    const documents = await registrationInformationService.create(req.body)
    return res.send(documents)
  } catch (error) {
    return next(
      new ApiError(500, 'Đã xảy ra lỗi khi truy xuất registrationInformation'),
    )
  }
}

// thêm tên bác sĩ vào thông tin đăng ký

exports.updateRegisInfo = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Data to update can not be empty'))
  }
  try {
    const registrationInformationService = new RegistrationInformationService(
      MongoDB.client,
    )
    const document = await registrationInformationService.update(
      req.params.id,
      req.body,
    )
    if (!document) {
      return next(new ApiError(404, 'RegistrationInformationService not found'))
    }
    return res.send({
      message: 'RegistrationInformationService was updated successfully',
    })
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error updating RegistrationInformationService with id=${req.params.id}`,
      ),
    )
  }
}

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Dữ liệu không thể rỗng'))
  }
  try {
    const registrationInformationService = new RegistrationInformationService(
      MongoDB.client,
    )
    const document = await registrationInformationService.update(
      req.params.id,
      req.body,
    )
    if (!document) {
      return next(
        new ApiError(404, 'Không thể tìm thấy registrationInformation'),
      )
    }
    return res.send({ message: 'Thông tin đăng ký đã cập nhật thành công' })
  } catch (error) {
    return next(new ApiError(500, `Lỗi cập nhật với id=${req.params.id}`))
  }
}
