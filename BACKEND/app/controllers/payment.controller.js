const PaymentService = require('../services/payment.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')

exports.findAll = async (req, res, next) => {
  let documents = []

  try {
    const paymentService = new PaymentService(MongoDB.client)
    documents = await paymentService.getAllInfo()
    return res.send(documents)
  } catch (error) {
    return next(new ApiError(500, 'Lỗi truy xuất PaymentService'))
  }
}

exports.create = async (req, res, next) => {
  try {
    console.log(req.body)
    const paymentService = new PaymentService(MongoDB.client)
    const documents = await paymentService.create(req.body)
    return res.send(documents)
  } catch (error) {
    return next(
      new ApiError(500, 'Đã xảy ra lỗi khi truy xuất PaymentService'),
    )
  }
}



