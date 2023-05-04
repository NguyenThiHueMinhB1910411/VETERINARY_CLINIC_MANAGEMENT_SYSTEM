const { ObjectId } = require("mongodb");

class FeedbackService {
  extractFeedbackData(payload) {
    const feedback = {
        TenKhachHang: payload.TenKhachHang,
        SoDienThoai: payload.SoDienThoai,
        Gmail:payload.Gmail,
        TenLoaiDichVu: payload.TenLoaiDichVu,
        PhanHoi:payload.PhanHoi,

        
    };
    Object.keys(feedback).forEach(
      (key) => feedback[key] === undefined && delete feedback[key]
    );
    return feedback;
  }
  constructor(client) {
    this.feedback = client.db().collection("feedback");
  }
  async getAll() {
    const curson = await this.feedback.find();
    return await curson.toArray();
  }
  async create(payload) {
    const data = this.extractFeedbackData(payload);
    const result = await this.feedback.insertOne(data);
    return result.value;
  }
}
module.exports = FeedbackService;
