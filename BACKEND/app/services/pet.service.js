const { ObjectId } = require("mongodb");

class PetService {
  extractPetData(payload) {
    const pet = {
        MaLoaiVatNuoi: payload.MaLoaiVatNuoi,
        UsernameVatNuoi: payload.UserVatNuoi,
        GioiTinh: payload.GioiTinh,
        CanNang: payload.CanNang,
        LoaiLong: payload.LoaiLong,
    };
    Object.keys(pet).forEach(
      (key) => pet[key] === undefined && delete pet[key]
    );
    return pet;
  }
  constructor(client) {
    this.pet = client.db().collection("pet");
  }
  async getAllPet() {
    const curson = await this.pet.find();
    return await curson.toArray();
  }
}
module.exports = PetService;
