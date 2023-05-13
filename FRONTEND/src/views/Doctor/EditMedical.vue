<script>
import medicalRecordService from "../../services/medicalRecord.service";
import MedicalSuppliesService from "../../services/medicalSupplies.service";
import PrescriptionService from "../../services/Prescription.service";
import registrationInformationService from "../../services/registrationInformation.service";
export default {
  data() {
    return {
     // id: this.$route.params.id,
      listMedicalSupplies: [],
      id: this.$route.params,
      chitiet:[],
      data: {
        prescription: null,
        service: "",
        soluong: 0,
        slSang: 0,
        slTrua: 0,
        slChieu: 0,
      },
      chandoan: "",
      ghichu: "",
      listMedical: [],
      sum: 0,
      info: {},
      NgayLapHoSo: new Date(),
    };
  },
  methods: {
    async getInfo(id) {
            try {
               const result = await PrescriptionService.get(id);
                this.data = result;
                this.ChiTiet = this.data.ChiTiet
            } catch (error) {
                console.log(error);
                console.log(this.Prescription);
            }
        },
     deleteMedical(index){
        this.ChiTiet.splice(index, 1)
     }   
  },
  created() {
    this.getInfo(this.$route.params.id);
  },
};
</script>
<template>
  <div class="my-3 py-3 bg-white">
    <div class="d-flex justify-content-between flex-row">
      <h5 class="fw-bold text-uppercase">Chỉnh sửa đơn thuốc</h5>
      <button class="btn btn-primary p-2 bg-primary" @click="addMedical">
        Thêm
      </button>
    </div>
    <div>
      <div class="d-flex flex-row w-100">
        <div class="d-flex flex-column w-50 me-2">
          <span class="text-start">Tên thuốc:</span>
          <select
            style="height: 38px; border-radius: 5px; border: 1px solid gray"
            :required="true"
            v-model="this.data.ChiTiet.service"
          >
            <option
              v-for="(medicalSupplies, index) in this.listMedicalSupplies"
              :value="medicalSupplies.TenThuoc"
            >
              {{ medicalSupplies.TenThuoc }}
            </option>
          </select>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-start">Số lượng: </span>

          <input
            type="text"
            class="form-control w-100"
            required
            placeholder="Nhập số lượng"
            v-model="this.data.ChiTiet.soluong"
          />
        </div>
      </div>
      <div class="d-flex flex-row mt-3 w-100">
        <div class="d-flex flex-column me-2" style="width: 33%">
          <span class="text-start"> Số lượng sáng:</span>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            required
            placeholder="Nhập số lượng thuốc"
            v-model="this.data.ChiTiet.slSang"
          />
        </div>
        <div class="me-2 d-flex flex-column" style="width: 33%">
          <span class="text-start"> Số lượng trưa:</span>
          <input
            type="number"
            min="1"
            max="20"
            class="form-control"
            id="formGroupExampleInput"
            required
            v-model="this.data.ChiTiet.slTrua"
          />
        </div>
        <div class="d-flex flex-column" style="width: 33%">
          <span class="text-start">Số lượng chiều:</span>
          <input
            type="number"
            min="1"
            max="20"
            class="form-control ms-1"
            id="formGroupExampleInput"
            required
            v-model="this.data.ChiTiet.slChieu"
          />
        </div>
      </div>
      <div class="d-flex flex-row mt-3 w-100">
        <div class="d-flex flex-column w-50 me-3">
          <span class="text-start">Chuẩn đoán:</span>
          <textarea
            class="form-control w-100 my-2"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="this.data.ChanDoan"
          ></textarea>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-start">Ghi chú:</span>
          <textarea
            class="form-control w-100 my-2"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="this.data.GhiChu"
          ></textarea>
        </div>
      </div>
    </div>

    <div>
      <table class="table border">
        <thead>
          <th>STT</th>
          <th>Tên thuốc</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Sáng</th>
          <th>Trưa</th>
          <th>Tối</th>
          <th>Thành tiền</th>
        </thead>
        <tbody>
          <tr v-for="(medical, index) in this.ChiTiet" v-bind:key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ medical.service }}</td>
            <td>{{ medical.soluong }}</td>
            <td>{{ medical.gia }}</td>
            <td>{{ medical.slSang }}</td>
            <td>{{ medical.slTrua }}</td>
            <td>{{ medical.slChieu }}</td>
            <td>
              <button @click="deleteMedical(index)">x</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <p>Tổng tiền: {{ this.sum }}</p>
      </div>
      <div>
        <!-- <button class="btn btn-primary" @click="handleSubmit">Hoàn tất</button> -->
        <button
          type="button"
          class="btn btn-primary"
          @click="
            handleSubmit({
              ...prescription,
              TrangThaiKeDon: 'Đã kê đơn',
            })
          "
          data-bs-dismiss="modal"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
