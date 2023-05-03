const { Object } = require("mongodb");

class ServiceService {
  extracServiceData(payload) {
    const service = {
        MaDichVu: payload.MaDichVu,
        TenDichVu: payload.TenDichVu,
        GiaCoVua: payload.GiaCoVua,
        GiaCoLon: payload.GiaCoLon,
        ChiPhiTheoGioVua:payload.ChiPhiTheoGioVua,
        ChiPhiTheoGioLon:payload.ChiPhiTheoGioLon,

        MaLoaiDichVu:payload.MaLoaiDichVu,
        Gia: payload.Gia,MaDichVu: payload.MaDichVu,
        TenDichVu: payload.TenDichVu,
        GiaCoVua: payload.GiaCoVua,
        GiaCoLon: payload.GiaCoLon,
        MaLoaiDichVu:payload.MaLoaiDichVu,
        Gia: payload.Gia,
        SoNgay:payload.SoNgay,
        
    };
    Object.keys(service).forEach(
      (key) => service[key] === undefined && delete service[key]
    );
    return service;
  }
  constructor(client) {
    this.service = client.db().collection("service");
  }
  async find(filter) {
    const curson = await this.service.find(filter);
    return await curson.toArray();
  }

  async create(payload) {
    console.log(payload);
    const data = this.extracServiceData(payload);
    console.log(data);
    const result = await this.service.insertOne(data);
    return result.value;
  }
  async getByName(payload){
    console.log(payload);
    const rs = await this.service.find({
      TenDichVu : payload.name
    })
    return rs.toArray()
  }
  async getAllService() {
    const curson = await this.service.find();
    return await curson.toArray();
  }

 
}
module.exports = ServiceService;
