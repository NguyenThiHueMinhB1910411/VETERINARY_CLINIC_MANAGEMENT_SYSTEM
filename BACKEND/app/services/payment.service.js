const { ObjectId } = require("mongodb");

class PaymentService {
  extractPaymentData(payload) {
    const payment = {
        TenKhachHang: payload.TenKhachHang,
        SoDienThoai: payload.SoDienThoai,
        UsernameVatNuoi: payload.UsernameVatNuoi,
        MaDangKy: payload.MaDangKy,
        TrangThaiThanhToan: payload.TrangThaiThanhToan??"Chưa thanh toán",
        Gia: payload.Gia,
    };


    Object.keys(payment).forEach(
      (key) => payment[key] === undefined && delete payment[key]
    );
    return payment;
  }
  constructor(client) {
    this.payment = client.db().collection("payment");
    this.prescription = client.db().collection("prescription");
    this.registrationInformation = client.db().collection("registrationInformation");
  }

  
  async getAll() {
    const curson = await this.payment.find();
    return await curson.toArray();
  }
  async getAllInfo(){
    const rs = await this.payment.aggregate([
 
      {
        $lookup: {
          from: "prescription",
          localField: "SoDienThoai",

          foreignField: "SoDienThoai",

          as: "info1",
        },
      },
      { $unwind: "$info1" },
      {
        $lookup: {
          from: "registrationInformation",
          localField: "SoDienThoai",

          foreignField: "SoDienThoai",

          as: "info2",
        },
      },
      { $unwind: "$info2" },
    ]);
    return await rs.toArray();
  }
  async find(filter) {
    const curson = await this.payment.find(filter);
    return await curson.toArray();
  }

  async create(payload) {
    console.log(payload);
    const data = this.extractPaymentData(payload);
    console.log(data);
    const result = await this.payment.insertOne(data);
    return result.value;
  }

}
module.exports = PaymentService;

