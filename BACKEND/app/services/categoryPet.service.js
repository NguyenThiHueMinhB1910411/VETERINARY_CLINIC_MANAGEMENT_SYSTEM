const { ObjectId } = require("mongodb");

class CategoryPetService {
  extractCategoryPetData(payload) {
    const categoryPet = {
      MaLoaiVatNuoi: payload.MaLoaiVatNuoi,
      TenLoaiVatNuoi: payload.TenLoaiVatNuoi,
     
    };
    Object.keys(categoryPet).forEach(
      (key) => categoryPet[key] === undefined && delete categoryPet[key]
    );
    return categoryPet;
  }
  constructor(client) {
    this.categoryPet = client.db().collection("categoryPet");
  }
  async getAllCategoryPet() {
    const curson = await this.categoryPet.find();
    return await curson.toArray();
  }
}
module.exports = CategoryPetService;
