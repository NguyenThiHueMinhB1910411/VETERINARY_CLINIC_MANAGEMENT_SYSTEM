const { ObjectId } = require("mongodb");

class CategoryServiceService {
  extractCategoryServiceData(payload) {
    const categoryService = {
      MaLoaiDichVu: payload.MaLoaiDichVu,
      TenLoaiDichVu: payload.TenLoaiDichVu,
      MoTa: payload.MoTa,
      HinhAnh: payload.HinhAnh,
      ChuyenTrang:payload.ChuyenTrang,
     
    };
    Object.keys(categoryService).forEach(
      (key) => categoryService[key] === undefined && delete categoryService[key]
    );
    return categoryService;
  }
  constructor(client) {
    this.categoryService = client.db().collection("categoryService");
  }
  async getAllCategoryService() {
    const curson = await this.categoryService.find();
    return await curson.toArray();
  }


  async find(filter) {
    const curson = await this.categoryService.find(filter);
    return await curson.toArray();
  }
}
module.exports = CategoryServiceService;
