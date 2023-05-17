const { ObjectId } = require('mongodb')

class PrescriptionService {
  extractPrescriptionData(payload) {
    const prescription = {
      MaDonThuoc: payload.MaDonThuoc,
      TenDichVu: payload.TenDichVu,
      TenLoaiDichVu: payload.TenDichVu,
      TenThuoc: payload.TenThuoc,
      SoLuongSang: payload.SoLuongSang,
      SoLuongTrua: payload.SoLuongTrua,
      SoLuongChieu: payload.SoLuongChieu,
      SoLuongToi: payload.SoLuongToi,
      SoLuong: payload.SoLuong,
      TongTien: payload.TongTien,
      TrangThai: payload.TrangThai,
      TenVatTuYTe: payload.TenVatTuYTe,
      Gia: payload.Gia,
      UsernameVatNuoi: payload.UsernameVatNuoi,
      MaDangKy: new ObjectId(payload._id),
      TenLoaiDichVu: payload.TenLoaiDichVu,
      GhiChu: payload.GhiChu,
      TrangThaiThanhToan: payload.TrangThaiThanhToan ?? 'Chưa thanh toán',
      TrangThaiKeDon: payload.TrangThaiKeDon ?? 'Đã kê đơn thuốc',
      ThanhToan: payload.ThanhToan ?? 'Chưa thanh toán',
      NgayKeDon: payload.NgayKeDon,
      TenKhachHang: payload.TenKhachHang,
      SoDienThoai: payload.SoDienThoai,
      ChuanDoan: payload.ChuanDoan,
    }
    Object.keys(prescription).forEach(
      (key) => prescription[key] === undefined && delete prescription[key],
    )
    return prescription
  }

  constructor(client) {
    this.prescription = client.db().collection('prescription')
    this.registrationInformation = client
      .db()
      .collection('registrationInformation')
    this.medicalSupplies = client.db().collection('medicalSupplies')
    this.medicalRecord = client.db().collection('medicalRecord')
  }

  async getAllInfo() {
    const rs = await this.registrationInformation.aggregate([
      {
        $lookup: {
          from: 'prescription',
          localField: 'UsernameVatNuoi',
          foreignField: 'UsernameVatNuoi',
          as: 'info1',
        },

      },
      // { $unwind: "$info1" },
    ])
    return await rs.toArray()
  }
  async getAll() {
    const curson = await this.prescription.find()
    return await curson.toArray()
  }

  async find(filter) {
    const curson = await this.prescription.find(filter)
    return await curson.toArray()
  }

  async create(payload) {
    const result = await this.prescription.insertOne({
      TenKhachHang: payload.TenKhachHang,
      SoDienThoai: payload.SoDienThoai,
      UsernameVatNuoi: payload.UsernameVatNuoi,
      ChanDoan: payload.ChanDoan,
      ThanhTien: payload.ThanhTien,
      ChiTiet: payload.ChiTiet,
      MaDangKy: new ObjectId(payload._id),
      GhiChu: payload.GhiChu,
      create_at: new Date(),
      update_at: '',
      NgayKeDon: payload.NgayKeDon,
      NgayTaiKham:payload.NgayTaiKham,
      GioTaiKham:payload.GioTaiKham,
    })
    return result
  }

  async delete(id) {
    const result = await this.doctor.findOneAndDelete({
      NgayFeefback: id,
    })
    return result
  }

  async update(id, payload) {
    const update = this.extractPrescriptionData(payload)
    console.log(payload);
    const arr = payload.map((value) => value.gia)
    const total = arr.reduce((total, curr) => {
      return total + curr
    })
    const result = await this.prescription.findOneAndUpdate(
      // { MaDonThuoc :id},
      { MaDangKy: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: {ChiTiet:payload, ThanhTien: total} },
      { returnDocument: 'after' },
    )
    console.log(result)
    return result.value
  }
  async findById(id) {
    const document = await this.prescription.findOne({
      MaDangKy: ObjectId.isValid(id) ? new ObjectId(id) : null,
    })
    console.log('findById',document)
    return document; 
  }
}
module.exports = PrescriptionService
