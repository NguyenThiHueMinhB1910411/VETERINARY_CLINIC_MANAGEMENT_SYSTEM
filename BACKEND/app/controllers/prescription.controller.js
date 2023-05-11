const PrescriptionService = require('../services/prescription.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')

exports.findAll = async (req, res, next) => {
  let documents = []

  try {
    const prescriptionService = new PrescriptionService(MongoDB.client)
    documents = await prescriptionService.getAllInfo();
    console.log(documents);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, 'Lỗi truy xuất prescriptionService'))
  }
}

exports.create = async (req, res, next) => {
  try {
    // console.log(req.body)
    const prescriptionService = new PrescriptionService(MongoDB.client)
    const documents = await prescriptionService.create(req.body)
    return res.send(documents)

  } catch (error) {
    return next(
      new ApiError(500, 'Đã xảy ra lỗi khi truy xuất prescriptionService'),
    )
  }
}

exports.findOne = async (req, res, next) => {
  try {
    const prescriptionService = new PrescriptionService(MongoDB.client)
    const document = await prescriptionService.findById(req.params.id);
    
    if (!document) {
      return next(new ApiError(404, 'Không tìm thấy prescriptionService'))
    }
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi truy xuất prescriptionService với id=${req.params.id}`,
      ),
    )
  }
}

exports.update = async (req, res, next) => {
  console.log(12345);
  console.log(req.body);
  console.log(req.params.id)
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu để cập nhật không được rỗng"));
  }
  try {
    const prescriptionService = new PrescriptionService(MongoDB.client)
    const document = await prescriptionService.update(req.params.id, req.body)
    if (!document) {
      return next(new ApiError(404, 'Không thể tìm thấy prescriptionService'))
    }
    return res.send({ message: 'prescriptionService đã cập nhật thành công' })
  } catch (error) {
    return next(new ApiError(500, `Lỗi cập nhật với id=${req.params.id}`))
  }
}
