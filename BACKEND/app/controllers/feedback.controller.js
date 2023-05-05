const FeedbackService = require('../services/feedback.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')

exports.findAll = async (req, res, next) => {
  let documents = []

  try {
    const feedbackService = new FeedbackService(MongoDB.client)
    documents = await feedbackService.getAllInfo()
    return res.send(documents)
  } catch (error) {
    return next(new ApiError(500, 'Lỗi truy xuất FeedbackService'))
  }
}

exports.create = async (req, res, next) => {
  try {
     console.log(req.body)
    const feedbackService = new FeedbackService(MongoDB.client)
    const documents = await feedbackService.create(req.body)
    return res.send(documents)

  } catch (error) {
    return next(
      new ApiError(500, 'Đã xảy ra lỗi khi truy xuất FeedbackService'),
    )
  }
}
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Dữ liệu không thể rỗng'))
  }
  try {
    const feedbackService = new FeedbackService(
      MongoDB.client,
    )
    const document = await feedbackService.update(
      req.params.id,
      req.body,
    )
    console.log(req.body)
    if (!document) {
      return next(
        new ApiError(404, 'Không thể tìm thấy feedbackService'),
      )
    }
    return res.send({ message: 'feedbackService Thông tin đăng ký đã cập nhật thành công' })
  } catch (error) {
    return next(new ApiError(500, `Lỗi cập nhật với id=${req.params.id}`))
  }
}


