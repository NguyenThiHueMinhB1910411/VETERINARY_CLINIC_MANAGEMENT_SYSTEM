const { ObjectId } = require("mongodb");

class InfoServiceService {
  extracInfoServiceData(payload) {
    const infoService = {
        MaDichVu: payload.MaDichVu,
        TenDichVu: payload.TenDichVu,
        GiaCoVua: payload.GiaCoVua,
        GiaCoLon: payload.GiaCoLon,
        MaLoaiDichVu:payload.MaLoaiDichVu,
        TenLoaiDichVu:payload.TenLoaiDichVu,

        
        
    };
    Object.keys(infoService).forEach(
      (key) => infoService[key] === undefined && delete infoService[key]
    );
    return infoService;
  }
  constructor(client) {
    this.infoService = client.db().collection("infoService");
    this.service = client.db().collection("service");
    this.categoryService = client.db().collection("categoryService");
  }
  async InfoServiceService() {
    const resultAll = await this.infoService.aggregate([
      {
        $lookup: {
          from: "service",
          localField: "MaDichVu",

          foreignField: "MaDichVu",

          as: "info",
        },
      },
      { $unwind: "$info" },
      {
        $lookup: {
          from: "categoryService",
          localField: "MaLoaiDichVu",

          foreignField: "MaLoaiDichVu",

          as: "allInfo",
        },
      },
      { $unwind: "$allThongTin" },
    ]);
    return await resultAll.toArray();
  }

  async getAllInfoService() {
    const curson = await this.infoService.find();
    return await curson.toArray();
  }
}
module.exports = InfoServiceService;
