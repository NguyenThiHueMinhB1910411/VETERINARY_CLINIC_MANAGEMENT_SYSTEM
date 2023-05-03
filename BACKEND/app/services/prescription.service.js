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
    this.registrationInformation = client.db().collection('registrationInformation')
    this.medicalSupplies = client.db().collection('medicalSupplies')
    this.medicalRecord = client.db().collection('medicalRecord')
  }

  async getAllInfo() {
    const rs = await this.prescription.aggregate([
      {
        $lookup: {
          from: 'registrationInformation',
          localField: 'UsernameVatNuoi',
          foreignField: 'UsernameVatNuoi',
          as: 'info1',
        },
      },
      {$unwind:'$info1'}
      
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
    })
    return result;
  }

  async delete(id) {
    // console.log(id)
    const result = await this.doctor.findOneAndDelete({
      MaDonThuoc: id,
    })
    return result
  }

  async update(id, payload) {
    const update = this.extractPrescriptionData(payload)
    const result = await this.prescription.findOneAndUpdate(
      // { MaDonThuoc :id},
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: 'after' },
    )
    console.log(result)
    return result.value
  }
  async findById(id) {
    return await this.prescription.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      //SoDienThoai: id,
    })
  }
}
module.exports = PrescriptionService
