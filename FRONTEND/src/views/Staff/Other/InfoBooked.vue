<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMoneyBill,
  faCreditCard,
  faPrint,
  faUser,
  faArrowLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMoneyBill,
  faPrint,
  faUser,
  faArrowLeft,
  faPenToSquare,
  faMoneyBill
);

import registrationInformationService from "../../../services/registrationInformation.service";
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      chooseOption: null,
      listRegistrationInformation: [],
      registrationInformation: [],

      value: {},
      dichvu: {},
      statistical: {},
      data: {},
      id: this.$route.params,
    };
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "bill.pdf",
      });
    },

    async getInfo(id) {
      try {
        this.data = await registrationInformationService.getById(id);
        console.log(this.data);
        //console.log(this.$route.params);
      } catch (error) {
        console.log(error);
        console.log(this.registrationInformation);
      }
    },

    async handleSubmit() {
      try {
        await registrationInformationService.update(this.value);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {},

  created() {
    this.getInfo(this.$route.params.id);
  },
};
</script>
<template>
  <main>
    <div class="my-3">
      <div class="col-4">
        <div class="d-flex">
          <div class="" style="font-size: 16px">
            <button
              class="btn style-button text-light px-2"
              @click="exportToPDF"
            >
              <font-awesome-icon icon="fa-solid fa-print" class="px-2" />Xuất
              file PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="element-to-convert">
      <div class="row" style="font-size: 16px">
        <div
          class="col  mx-2 p-4"
          style="
           box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); 
            background-color: white;
          "
        >
          <h5>THÔNG TIN KHÁCH HÀNG</h5>
          <div class="py-2">
            <b>Tên khách hàng: </b>
            <span>{{ this.data.TenKhachHang }}</span>
          </div>
          <div class="py-2">
            <b>Gmail: </b>
            <span>{{ this.data.Gmail }}</span>
          </div>
          <div class="py-2">
            <b>Số điện thoại: </b>
            <span>{{ this.data.SoDienThoai }}</span>
          </div>
          <div class="py-2">
            <b>Địa chỉ: </b>
            <span>{{ this.data.DiaChi }}</span>
          </div>
        </div>
        <div
          class="col  mx-2 p-4"
          style="
            box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); 
            background-color: white;
          "
        >
          <h5>THÔNG TIN DỊCH VỤ</h5>
          <div class="py-2">
            <b>Tên loại dịch vụ: </b>
            <span>{{ this.data.TenLoaiDichVu }}</span>
          </div>
          <div class="py-2">
            <b>Tên dịch vụ: </b>
            <span>{{ this.data.TenDichVu }}</span>
          </div>

          <div class="py-2">
            <b>Tên vật nuôi: </b>
            <span>{{ this.data.UsernameVatNuoi }}</span>
          </div>
          <div class="py-2">
            <b> Ngày Đăng ký lịch:</b>
            <span>{{ this.data.NgayDangKy }}</span>
          </div>
          <div class="py-2">
            <b>Ngày khám: </b>
            <span>{{ this.data.NgayKham }}</span>
          </div>
          <div class="py-2">
            <b>Giờ khám: </b>
            <span>{{ this.data.GioKham }}</span>
          </div>
          <div class="py-2">
            <b>Giá </b>
            <span>
              {{
                new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
                  .format(this.data.Gia)
                  .replace("VND", "")
              }}</span
            >
          </div>
          <div class="py-2">
            <b>Trạng thái dịch vụ: </b>
            <span>{{ this.data.TrangThaiDichVu }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </main>
</template>
<style scoped>
.style-button {
  background-color: #cc4d26;
  color: white;
}
</style>
