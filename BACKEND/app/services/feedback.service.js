const { ObjectId } = require("mongodb");

class FeedbackService {
  extractFeedbackData(payload) {
    const feedback = {
        TenKhachHang: payload.TenKhachHang,
        SoDienThoai: payload.SoDienThoai,
        Gmail:payload.Gmail,
        TenLoaiDichVu: payload.TenLoaiDichVu,
        NoiDung:payload.NoiDung,
        NgayFeedback: payload.NgayFeedback,

        
    };
    Object.keys(feedback).forEach(
      (key) => feedback[key] === undefined && delete feedback[key]
    );
    return feedback;
  }
  constructor(client) {
    this.feedback = client.db().collection("feedback");
    this.registrationInformation = client.db().collection("registrationInformation");
  }
  async getAll() {
    const curson = await this.feedback.find();
    return await curson.toArray();
  }
  async getAllInfo() {
    const resultAll = await this.feedback.aggregate([
      {
        $lookup: {
          from: "registrationInformation",
          localField: "SoDienThoai",

          foreignField: "SoDienThoai",

          as: "info",
        },
      },
      
    ]);
    return await resultAll.toArray();
  }
  async create(payload) {
    const data = this.extractFeedbackData(payload);
    const result = await this.feedback.insertOne(data);
    return result.value;
  }
}
module.exports = FeedbackService;
