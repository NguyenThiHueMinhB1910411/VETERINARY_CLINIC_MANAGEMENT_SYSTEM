const FeedbackService = require('../services/feedback.service')
const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')

exports.findAll = async (req, res, next) => {
  let documents = []

  try {
    const feedbackService = new FeedbackService(MongoDB.client)
    documents = await feedbackService.getAll()
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


