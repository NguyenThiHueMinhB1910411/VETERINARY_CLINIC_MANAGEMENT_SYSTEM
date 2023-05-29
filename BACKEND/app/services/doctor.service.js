const { ObjectId } = require("mongodb");

class DoctorService {
  extractDoctorData(payload) {
    const doctor = {
      MaBacSi: payload.MaBacSi,
      TenBacSi: payload.TenBacSi,
      SoDienThoai: payload.SoDienThoai,
      GioiTinh: payload.GioiTinh,
      DiaChi: payload.DiaChi,
      GioiTinh: payload.GioiTinh,
      ChucVu: payload.ChucVu,
      Gmail: payload.Gmail,
      HinhAnh:payload.HinhAnh,

      TenAccount: payload.TenAccount,

    };
    Object.keys(doctor).forEach(
      (key) => doctor[key] === undefined && delete doctor[key]
    );
    return doctor;
  }
  constructor(client) {
    this.doctor = client.db().collection("doctor");
  }
  async getAllDoctor() {
    const curson = await this.doctor.find();
    return await curson.toArray();
  }

  

  async create(file, payload) {
    const data = this.extractDoctorData({...payload, HinhAnh: file.name});

    let folderPath = "D:\\LUAN VAN\\LUANVAN\\FRONTEND\\src\\assets\\images";
    file.mv(`${folderPath}/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });

    const result = await this.doctor.insertOne(data);
    return result.value;
  }


  

  async find(filter) {
    const curson = await this.doctor.find(filter);
    return await curson.toArray();
  }
  async findById(id) {
    return await this.doctor.findOne({
      // MaBacSi: id,
    });
  }


  //try
  async update(id, payload) {
    const update = this.extractDoctorData(payload);
    const result = await this.doctor.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    console.log(id);
    const result = await this.doctor.findOneAndDelete({
      MaBacSi :id
    })
    return result;
  }


}
module.exports = DoctorService;
