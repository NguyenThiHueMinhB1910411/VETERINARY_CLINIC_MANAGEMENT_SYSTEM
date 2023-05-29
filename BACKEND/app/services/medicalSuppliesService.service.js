const { ObjectId} = require("mongodb");

class MedicalSuppliesService {
  extractMedicalSupplieseData(payload) {
    const medicalSupplies = {
      MaVatTu: payload.MaVatTu,
      TenVatTuYTe: payload.TenVatTu,
      TenThuoc:payload.TenThuoc,
      Gia:payload.Gia,
      HinhAnh:payload.HinhAnh,
      MoTa:payload.MoTa,



    };
    Object.keys(medicalSupplies).forEach(
      (key) => medicalSupplies[key] === undefined && delete medicalSupplies[key]
    );
    return medicalSupplies;
  }
  constructor(client) {
    this.medicalSupplies = client.db().collection("medicalSupplies");
  }

 
  async create(file,payload) {
    const data = this.extractMedicalSupplieseData({...payload, HinhAnh: file.name});

    let folderPath = "D:\\LUAN VAN\\LUANVAN\\FRONTEND\\src\\assets\\images";
    file.mv(`${folderPath}/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });
    const result = await this.medicalSupplies.insertOne(data);
    return result.value;
  }
  async getByName(payload){
    console.log(payload);
    const rs = await this.medicalSupplies.find({
       MaVatTu: payload.name
    })
    return rs.toArray()
  }

  async getAll() {
    const curson = await this.medicalSupplies.find();
    return await curson.toArray();
  }


  

  async find(filter) {
    const curson = await this.medicalSupplies.find(filter);
    return await curson.toArray();
  }
  async findByNameMedical(data) {
    const document =  await this.medicalSupplies.findOne({
      TenThuoc: data,
    });
    const gia = {gia: document.Gia}
    return gia
  }

  // async delete(id) {
  //   console.log(id);
  //   const result = await this.medicalSupplies.findOneAndDelete({
  //     MaVatTu :id
  //   })
  //   return result;
  // }
  async delete(id) {
    console.log(id);
    const result = await this.medicalSupplies.findOneAndDelete({
      MaVatTu :id
    })
    return result;
  }

}
module.exports = MedicalSuppliesService;

