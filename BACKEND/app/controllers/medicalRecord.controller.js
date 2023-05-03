const MedicalRecordService = require('../services/medicalRecord.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')


exports.create = async (req, res, next) => {
  try {
    // console.log(req.body)
    const medicalRecordService = new MedicalRecordService(MongoDB.client)
    const documents = await medicalRecordService.create(req.body)
    return res.send(documents)
  } catch (error) {
    return next(
      new ApiError(500, 'Đã xảy ra lỗi khi truy xuất medicalRecordService'),
    )
  }
}

exports.findAll = async (req, res, next) => {
  let documents = []
  try {
    const medicalRecordService = new MedicalRecordService(
      MongoDB.client,
    )
    documents = await medicalRecordService.getAll()
  } catch (error) {
    return next(
      new ApiError(
        500,
        'Đã xảy ra lỗi khi truy xuất medicalRecordService',
      ),
    )
  }

  return res.send(documents)
}
exports.getAllInfo = async (req, res, next) => {
  let documents = []
  try {
    const medicalRecordService = new MedicalRecordService(
      MongoDB.client,
    )
    documents = await medicalRecordService.getAllInfo()
  } catch (error) {
    return next(
      new ApiError(
        500,
        'Đã xảy ra lỗi khi truy xuất medicalRecordService',
      ),
    )
  }

  return res.send(documents)
}
exports.findOne = async (req, res, next) => {
  try {
    console.log(123)
    const medicalRecord = new MedicalRecordService(MongoDB.client)
    const document = await medicalRecord.findById(req.params.id)
    if (!document) {
      return next(new ApiError(404, 'Không tìm thấy MedicalRecordService'))
    }
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất MedicalRecordService với id=${req.params.id}`,
      ),
    )
  }
}

