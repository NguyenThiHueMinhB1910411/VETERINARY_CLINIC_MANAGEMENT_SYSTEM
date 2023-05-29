<script>

import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faArrowLeft,
    faAdd,
    faRotateRight,
    faTrash,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faAdd, faRotateRight, faTrash,faPlus,);

import medicalRecordService from "../../services/medicalRecord.service";
import MedicalSuppliesService from "../../services/medicalSupplies.service";
import PrescriptionService from "../../services/Prescription.service";
import registrationInformationService from "../../services/registrationInformation.service";
export default {
  data() {
    return {
      id: this.$route.params.id,
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
    async addMedical() {
      const giasanpham = await MedicalSuppliesService.getMedical({
        service: this.data.service,
      });
      
      this.sum += giasanpham.gia * this.data.soluong;
      this.ChiTiet.push({
        service: this.data.service,
        soluong: this.data.soluong,
        gia: giasanpham.gia * this.data.soluong,
        slSang: this.data.slSang,
        slTrua: this.data.slTrua,
        slChieu: this.data.slChieu,
  
      });

      (this.data.service = ""),
        (this.data.soluong = 0),
        (this.data.slTrua = 0),
        (this.data.slSang = 0),
        (this.data.slChieu = 0);
    },
    async handleUpdate(id) {
      // console.log();
            if (confirm("Bạn có cập nhật đơn thuốc này ?")) {
                await PrescriptionService.update(id,this.ChiTiet);
               
            }
            this.$router.push({ name: "SelfCalenadar" });
        },
 
       
    async retrieveList() {
      this.listMedicalSupplies = await MedicalSuppliesService.getAll();
      this.info = await registrationInformationService.getById(this.id);
    },
    async getInfo(id) {
      try {
        const result = await PrescriptionService.get(id);
        this.data = result;
        this.ChiTiet = this.data.ChiTiet;
          this.sum = this.data.ThanhTien
        // cons
          console.log(this.data,this.sum)
            } catch (error) {
                console.log(error);
                console.log(this.Prescription);
            }
        },
     deleteMedical(element,index){
        this.ChiTiet.splice(index, 1);
        console.log(this.sum,element.gia, element.soluong);
        this.sum -= element.gia;
        console.log(this.ChiTiet, this.sum)
     }   
  },
  created() {
    this.getInfo(this.$route.params.id);
    this.retrieveList();
  },
};
</script>
<template>
  <div class="my-3 py-3 bg-white container">
    <h5 class="fw-bold text-uppercase ">KIỂM TRA SỨC KHỎE</h5>
    <div class="d-flex pb-4 flex-row mt-3 w-100">
        <div class="d-flex flex-column w-50 me-3">
          <span class="text-start">
            &nbsp  <b> Chuẩn đoán:</b>
            

          </span>
          <textarea
            class="form-control w-100 my-2"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="this.data.ChanDoan"
          ></textarea>
        </div>
        <div class="d-flex flex-column w-50">
          <span class="text-start">
            &nbsp   <b> Ghi chú:</b>
            
          </span>
          <textarea
            class="form-control w-100 my-2"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="this.data.GhiChu"
          ></textarea>
        </div>
      </div>
      <div class="py-4 mt-5" style="background-color: rgb(236, 242, 247); border-radius: 10px; border: 1px solid gray;" >
        <div class="d-flex justify-content-between flex-row" >
      <h5 class="fw-bold text-uppercase text-center" >Chỉnh sửa đơn thuốc</h5>
      <button class="btn  p-2 text-light" style="background-color: #084d7b;" @click="addMedical">
        <font-awesome-icon icon="fa-solid fa-plus" />
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
            v-model="data.service"
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
          type="number"
            min="0"
            max="20"
            class="form-control w-100"
            required
            placeholder="Nhập số lượng"
            v-model="this.data.soluong"
          />
        </div>
      </div>
      <div class="d-flex flex-row mt-3 w-100">
        <div class="d-flex flex-column me-2" style="width: 33%">
          <span class="text-start"> Số lượng sáng:</span>
          <input
          type="number"
            min="0"
            max="20"
            class="form-control"
            id="formGroupExampleInput"
            required
            placeholder="Nhập số lượng thuốc"
            v-model="this.data.slSang"
          />
        </div>
        <div class="me-2 d-flex flex-column" style="width: 33%">
          <span class="text-start"> Số lượng trưa:</span>
          <input
            type="number"
            min="0"
            max="20"
            class="form-control"
            id="formGroupExampleInput"
            required
            v-model="this.data.slTrua"
          />
        </div>
        <div class="d-flex flex-column" style="width: 33%">
          <span class="text-start">Số lượng chiều:</span>
          <input
            type="number"
            min="0"
            max="20"
            class="form-control ms-1"
            id="formGroupExampleInput"
            required
            v-model="this.data.slChieu"
          />
        </div>
      </div>
      
    </div>

    <div class="py-2">
      <table class="table border bg-light ">
        <thead>
          <th>STT</th>
          <th>Tên thuốc</th>
          <th>Số lượng</th>
          <!-- <th>Giá</th> -->
          <th>Sáng</th>
          <th>Trưa</th>
          <th>Chiều</th>
          <th>Thành tiền</th>
        </thead>
        <tbody>
          <tr v-for="(medical, index) in this.ChiTiet" v-bind:key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ medical.service }}</td>
            <td>{{ medical.soluong }}</td>
            <!-- <td>{{ medical.gia }}</td> -->
            <td>{{ medical.slSang }}</td>
            <td>{{ medical.slTrua }}</td>
            <td>{{ medical.slChieu }}</td>
            <td>{{
                    new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                      .format(medical.gia)
                      .replace("VND", "")
                  }} vnđ</td>
            <td>
              <td>
              <button @click="deleteMedical(medical,index)" class="bg-danger text-light rounded border-light"> x </button>
            </td>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <p><b>Tổng tiền:</b> {{
                    new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                      .format(this.sum)
                      .replace("VND", "")
                  }} vnđ</p>
      </div>
      <div>
        <!-- <button class="btn btn-primary" @click="handleSubmit">Hoàn tất</button> -->
        <button
          type="button"
          class="btn text-light " style="background-color: #b3362d; border:1px #c07b7b  solid;"
          @click="handleUpdate(this.$route.params.id)"
        >
          Lưu
        </button>
      </div>
    </div>

      </div>

    
  </div>
</template>

<style scoped></style>
