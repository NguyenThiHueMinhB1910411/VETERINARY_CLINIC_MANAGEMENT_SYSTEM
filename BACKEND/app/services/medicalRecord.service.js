const { ObjectId } = require('mongodb')

class MedicalRecordService {
  extractMedicalRecordData(payload) {
    const medicalRecord = {
      TenKhachHang: payload.TenKhachHang,
      SoDienThoai: payload.SoDienThoai,
    
      
      ChiTiet: [
        {
          UsernameVatNuoi: payload.UsernameVatNuoi,
          NgayKham: [
            new Date().toLocaleString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh',
            }),
          ],
        },
      ],
    }
    Object.keys(medicalRecord).forEach(
      (key) => medicalRecord[key] === undefined && delete medicalRecord[key],
    )
    return medicalRecord
  }
  constructor(client) {
    this.medicalRecord = client.db().collection('medicalRecord')
    this.prescription = client.db().collection('prescription')
    this.registrationInformation = client.db().collection('registrationInformation')
    this.medicalSupplies = client.db().collection('medicalSupplies')
  }

  async create(payload) {
    console.log('createmedicalRecord', payload)
    const user = await this.medicalRecord.findOne({
      SoDienThoai: payload.SoDienThoai,
    })
    // console.log(2)
    // console.log(user)
    if (user !== null) {
      const pet = await this.medicalRecord.findOne({
        'ChiTiet.UsernameVatNuoi': payload.UsernameVatNuoi,
      })
      if (pet !== null) {
        // console.log(2)
        const result = await this.medicalRecord.findOneAndUpdate(
          {
            SoDienThoai: payload.SoDienThoai,
          },
          {
            $set: {
              'ChiTiet.$[elem].NgayKham': 
                new Date().toLocaleString('vi-VN', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                }),
            },
          },
          {
            arrayFilters: [
              { 'elem.UsernameVatNuoi': { $eq: payload.UsernameVatNuoi } },
            ],
          },
        )
      return result.value;
      } else {
        // console.log(11234);
        const result = await this.medicalRecord.findOneAndUpdate(
          {
            SoDienThoai: payload.SoDienThoai,
          },
          { $push: { ChiTiet: {
            UsernameVatNuoi: payload.UsernameVatNuoi,
            NgayKham: [...payload.NgayLapHoSo]
          } } },
        );
        console.log(result.ok);
      return result.value;
      }
    } 
    else {
      const result = await this.medicalRecord.insertOne({
        SoDienThoai: payload.SoDienThoai,
        TenKhachHang: payload.TenKhachHang,
        ChiTiet: [
          {
            UsernameVatNuoi: payload.UsernameVatNuoi,
            NgayKham: [
              new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
              }),
            ],
          },
        ],
      })
      return result.value;
    }
  }
  async getAll() {
    const curson = await this.medicalRecord.aggregate([{ $unwind: '$ChiTiet' }])
    return await curson.toArray()
  }
  async findById(id) {
    return await this.medicalRecord.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      //SoDienThoai: id,
    })
  }

  async getAllInfo() {
    const rs = await this.medicalRecord.aggregate([
      {
        $lookup: {
          from: 'registrationInformation',
          localField: 'SoDienThoai',
          foreignField: 'SoDienThoai',
          as: 'registrationInformation',
        },
      },
      { $unwind: '$registrationInformation' },
      {
        $lookup: {
          from: 'prescription',
          let: {
            sdt: '$SoDienThoai',
            maDangKy: '$registrationInformation._id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$SoDienThoai', '$$sdt'],
                    },
                    {
                      $eq: ['$MaDangKy', '$$maDangKy'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'prescription',
        },
      },
      // { $unwind: "$prescription" },
      // {
      //   $lookup: {
      //     from: "prescription",
      //     localField: "MaDangKy",

      //     foreignField: "registrationInformation._id",

      //     as: "prescription",
      //   },
      // },
      // { $unwind: "$info2" },

      // {
      //   $lookup: {
      //     from: "medicalSupplies",
      //     localField: "TenThuoc",

      //     foreignField: "TenThuoc",

      //     as: "info3",
      //   },
      // },
      // { $unwind: "$info3" },
    ])
    console.log(rs)
    return await rs.toArray()
  }
}
module.exports = MedicalRecordService
