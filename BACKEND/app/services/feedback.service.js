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
        
      TrangThai: payload.TrangThai??"Chưa phản hồi",
        
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
      { $unwind: "$info" },
      
    ]);
    return await resultAll.toArray();
  }
  async create(payload) {
    const data = this.extractFeedbackData(payload);
    const result = await this.feedback.insertOne(data);
    return result.value;
  }
  async find(filter) {
    const curson = await this.feedback.find(filter);
    return await curson.toArray();
  }

  async update(id, payload) {
    console.log(payload);
    const update = this.extractFeedbackData(payload);
    const result = await this.feedback.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: "after" }
    );

    const ri = await this.feedback.findOne({
      SoDienThoai: result.value.SoDienThoai,
    });
    // console.log(ri);
    const nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: "minhb1910411@student.ctu.edu.vn",
        pass: "qvsdnjwzinyfpkph",
      },
    });
    if (result.value.TrangThai == "Đã phản hồi") {
      var mainOptions = {
        from: " VETERINARY CLINIC",
        to: ri.Gmail,
        subject: "PHẢN HỒI FEEDBACK",
        text: "Bạn đã nhận tin nhắn đến từ  VETERINARY CLINIC",
        html:

          " <b>Xin chào </b>" +
          ri.TenKhachHang +
          "<br/> Cảm ơn phản hồi của bạn về dịch vụ "  +
             ri.TenLoaiDichVu
           +
          " của chúng tôi."+ " <br/>Chúng tôi sẽ dựa trên đánh giá của bạn để có thể cải thiện dịch vụ ngày càng tốt hơn nữa."+
          
          "<br/> Trân trọng cảm ơn ,",
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
      });
    } 

    console.log(nodemailer.getTestMessageUrl(mainOptions));
    return result.value;
  }

}
module.exports = FeedbackService;
