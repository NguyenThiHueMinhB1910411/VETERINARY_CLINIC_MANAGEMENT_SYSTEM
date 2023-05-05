const { ObjectId } = require('mongodb')

class RegistrationInformationService { 
  extracRegistrationInformationData(payload) {
    const registrationInformation = {
      TenKhachHang: payload.TenKhachHang,
      SoDienThoai: payload.SoDienThoai,
      DiaChi: payload.DiaChi,
      Gmail: payload.Gmail,
      
      NgayDangKy: payload.NgayDangKy,
      NgayDuyet: payload.NgayDuyet,
      NgayKham: payload.NgayKham,
      GioKham: payload.GioKham,

      TrangThaiPheDuyet: payload.TrangThaiPheDuyet??"Chờ xác nhận",
      
      MoTa: payload.MoTa,
      MaDichVu: payload.MaDichVu,
      TenDichVu: payload.TenDichVu,
      MaLoaiVatNuoi:payload.MaLoaiVatNuoi,
      TenLoaiVatNuoi: payload.TenLoaiVatNuoi,
      UsernameVatNuoi:payload.UsernameVatNuoi,
      GioiTinh: payload.GioiTinh,
      Tuoi: payload.Tuoi,
      CanNang: payload.CanNang,
      MauSac: payload.MauSac,
      LoaiLong: payload.LoaiLong,
      SoNgay:payload.SoNgay,
      MaLoaiDichVu: payload.MaLoaiDichVu,
      TenLoaiDichVu: payload.TenLoaiDichVu,
      TenBacSi: payload.TenBacSi,
      TrangThaiKhamBenh: payload.TrangThaiKhamBenh??"Chờ khám",
      TrangThaiDichVu: payload.TrangThaiDichVu??"Chưa hoàn tất",
      Gia: payload.Gia,
      GhiChuThem: payload.GhiChuThem,
      


    }
    Object.keys(registrationInformation).forEach(
      (key) => registrationInformation[key] === undefined && delete registrationInformation[key],
    )
    return registrationInformation
  }
  constructor(client) {
    this.registrationInformation = client.db().collection('registrationInformation');
    this.service = client.db().collection('service');
    
  
  }

  async getAllInfo(){
    const rs = await this.registrationInformation.aggregate([
      {
        $lookup: {
          from: "service",
          localField: "TenDichVu",

          foreignField: "TenDichVu",

          as: "info3",
        },
      },
      { $unwind: "$info3" },
     
    ]);
    return await rs.toArray();
  }


  async find(filter) {
    const curson = await this.registrationInformation.find(filter);
    return await curson.toArray();
  }
  async findById(id){
    return await this.registrationInformation.findOne({
         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        //SoDienThoai: id,
    });
}

  // async getAllRegistrationInformation() {
  //   const curson = await this.registrationInformation.find();
  //   return await curson.toArray();
  // }

  async create(payload) {
    const data = this.extracRegistrationInformationData(payload);
    const service = await this.service.findOne({
      
      TenDichVu: payload.TenDichVu,
    })
    console.log(payload.CanNang);
    if( 0 < payload.CanNang && payload.CanNang <= 7){
      data.Gia = service.GiaCoVua
    }
    else data.Gia = service.GiaCoLon
    console.log(data);

    const result = await this.registrationInformation.insertOne(data);
    return result.value;
  }

  async update(id, payload) {
    console.log(payload);
    const update = this.extracRegistrationInformationData(payload);
    const result = await this.registrationInformation.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: "after" }
    );

    const ri = await this.registrationInformation.findOne({
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
    if (result.value.TrangThaiPheDuyet == "Đã duyệt") {
      var mainOptions = {
        from: " VETERINARY CLINIC",
        to: ri.Gmail,
        subject: "PHẢN HỒI KẾT QUẢ ĐĂNG KÝ",
        text: "Bạn đã nhận tin nhắn đến từ  VETERINARY CLINIC",
        html:

          " <b>Xin chào </b>" +
          ri.TenKhachHang +
          "<br/> Yêu cầu đăng ký về dịch vụ "  +
             ri.TenLoaiDichVu
           +
          " của bạn đã được duyệt "+
          
          "<br/><small> Trân trọng cảm ơn </small>,",
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
module.exports = RegistrationInformationService
