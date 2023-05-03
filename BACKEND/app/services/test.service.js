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
      TrangThaiPheDuyet: payload.TrangThaiPheDuyet??"Chờ xác nhận",
      NgayKham: payload.NgayKham,
      GioKham: payload.NgayKham,
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


      MaLoaiDichVu: payload.MaLoaiDichVu,
      TenLoaiDichVu: payload.TenLoaiDichVu,
    }
    Object.keys(registrationInformation).forEach(
      (key) => registrationInformation[key] === undefined && delete registrationInformation[key],
    )
    return registrationInformation
  }
  constructor(client) {
    this.registrationInformation = client.db().collection('registrationInformation');
    // this.customer = client.db().collection('customer');
    // this.service = client.db().collection('service');
    // this.service = client.db().collection('pet');
    // this.service = client.db().collection('categoryPet');
    
  
  }


  async find(filter) {
    const curson = await this.registrationInformation.find(filter);
    return await curson.toArray();
  }

  // async getAllRegistrationInformation() {
  //   const resultAll = await this.registrationInformation.aggregate([
  //     {
  //       $lookup: {
  //         from: 'customer',
  //         localField: 'SoDienThoai',

  //         foreignField: 'SoDienThoai',

  //         as: 'infoCustomer',
  //       },
  //     },
  //     { $unwind: '$infoCustomer' },
  //     {
  //       $lookup: {
  //         from: 'service',
  //         localField: 'MaDichVu',

  //         foreignField: 'MaDichVu',

  //         as: 'infoCustomerService',
  //       },
  //     },
  //     { $unwind: '$infoCustomerService' },
  //     {
  //       $lookup: {
  //         from: 'pet',
  //         localField: 'UsernameVatNuoi',

  //         foreignField: 'UsernameVatNuoi',

  //         as: 'infoCustomerServicePet',
  //       },
  //     },
  //     { $unwind: '$infoCustomerServicePet' },
  //     {
  //       $lookup: {
  //         from: 'categoryPet',
  //         localField: 'MaLoaiDichVu',

  //         foreignField: 'MaLoaiDichVu',

  //         as: 'infoCustomerServicePetCategory',
  //       },
  //     },
  //     { $unwind: '$infoCustomerServicePetCategory' },

     


  //   ])
  //   return await resultAll.toArray()
  // }

  async findById(id) {
    return await this.registrationInformation.findOne({
      SoDienThoai: id,
    });
  }

  async getAllRegistrationInformation() {
    const curson = await this.registrationInformation.find();
    return await curson.toArray();
  }

  async create(payload) {
    console.log(payload);
    const data = this.extracRegistrationInformationData(payload);
    console.log(data);
    const result = await this.registrationInformation.insertOne(data);
    return result.value;
  }

  async update(id, payload) {

    console.log(id);
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    console.log(id);
    const update = this.extracRegistrationInformationData(payload);
    const result = await this.registrationInformation.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    console.log(result.value);




    const ri = await this.registrationInformation.findOne({
      SoDienThoai: result.value.SoDienThoai,
    });

    console.log(await ri);
    const nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: "huong280517@gmail.com",
        pass: "fwspvciwqpwngxrs",
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
          "<br/> <b>YÊU CẦU ĐĂNG KÝ CỦA BẠN ĐÃ ĐƯỢC PHÊ DUYỆT</b>" +
          
          "<small> Trân trọng cảm ơn </small>,",
      };
    } 
    // else {
    //   var mainOptions = {
    //     from: " VETERINARY CLINIC",
    //     to: ri.Gmail,
    //     subject: "PHẢN HỒI KẾT QUẢ ĐĂNG KÝ",
    //     text: "Bạn đã nhận tin nhắn đến từ  VETERINARY CLINIC",
    //     html:
    //       " <b>Xin chào </b>" +
    //       ri.TenKhachHang +
    //       "<br/> <b>YÊU CẦU ĐĂNG KÝ CỦA BẠN ĐÃ BỊ HỦY</b>" +
    //       "<br/> <small> Trân trọng cảm ơn </small>,",
    //   };
    // }
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
    return result.value;
  }
}
module.exports = RegistrationInformationService
