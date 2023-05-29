const { ObjectId } = require("mongodb");

class StaffService {
  extractStaffData(payload) {
    const staff = {
      MaNhanVien: payload.MaNhanVien,
      TenNhanVien: payload.TenNhanVien,
      SoDienThoai: payload.SoDienThoai,
      DiaChi: payload.DiaChi,
      GioiTinh: payload.GioiTinh,
      ChucVu: payload.ChucVu,
      Gmail: payload.Gmail,
      HinhAnh:payload.HinhAnh,

      TenAccount: payload.TenAccount,
    };
    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    );
    return staff;
  }
  constructor(client) {
    this.staff = client.db().collection("staff");
  }
  async getAllStaff() {
    const curson = await this.staff.find();
    return await curson.toArray();
  }
 
  async create(file, payload) {
    console.log(file);
    const data = this.extractStaffData({...payload, HinhAnh: file.name});

    let folderPath = "D:\\LUAN VAN\\LUANVAN\\FRONTEND\\src\\assets\\images";
    file.mv(`${folderPath}/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });

    const result = await this.staff.insertOne(data);
    return result.value;
  }


  async find(filter) {
    const curson = await this.staff.find(filter);
    return await curson.toArray();
  }
  async findById(id) {
    return await this.staff.findOne({
      MaBacSi: id,
    });
  }

  async update(id, payload) {
    const update = this.extractStaffData(payload);
    const result = await this.staff.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    console.log(id);
    const result = await this.staff.findOneAndDelete({
      MaNhanVien :id
    })
    return result;
  }
}
module.exports = StaffService;
