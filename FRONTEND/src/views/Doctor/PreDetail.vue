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

import PrescriptionService from "../../services/Prescription.service";
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      chooseOption: null,
      listPrescription: [],
      Prescription: [],
      product: {
        description: " Payment for Backlink app",
        price: 9.99,
      },
      //
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
        filename: "prescription.pdf",
      });
    },

    async getInfo(id) {
      try {
        const result = await PrescriptionService.get(id);
        this.data = result;

        console.log(result);
      } catch (error) {
        console.log(error);
        console.log(this.Prescription);
      }
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATEMg2mbQ8vBzjmJe5BlUjR-E2swm1lCz5O5c9JhrcNFnIsHKYcoFd881yFPObcHnj05gN3ERU30IIGO";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },

  created() {
    this.getInfo(this.$route.params.id);
  },
};
</script>
<template>
  <main style="background-color: white !important">
    <div class="mt-3">
      <button
        type="button"
        class="btn text-light mb-4"
        style="background-color: #cc4d26; font-size: 16px"
      >
        <font-awesome-icon
          icon="fa-solid fa-print"
          class="px-2"
          @click="exportToPDF"
        />
        Xuất file pdf
      </button>
    </div>
    <div id="element-to-convert" style="padding: 0 60px">
      <div class="row pt-5" style="background-color: white; font-size: 17px">
        <div class="col-6">
          <p style="font-weight: 700">VETERINARY CLINIC</p>
          <p><b>Số điện thoại:</b> 0389943552</p>
          <p>Cần Thơ</p>
        </div>
        <div
          class="col-6 d-flex justify-content-end"
          style="padding-right: 50px"
        >
          <p class="fw-bold">{{ this.data.NgayKeDon }}</p>
        </div>
        <div class="text-center fw-bold">PHIẾU KHÁM CHỮA BỆNH THÚ Y</div>
      </div>
      <div
        class="row text-center"
        style="background-color: white; font-size: 16px; padding: 5% 1% 20% 1%"
      >
        <table class="table">
          <tr>
           
            <th>Ngày kê đơn thuốc:</th>

            <td>{{ this.data.NgayKeDon }}</td>
          </tr>
          <tr>
            <th>Tên khách hàng</th>
            <td>{{ this.data.TenKhachHang }}</td>
            <th>Số điện thoại</th>
            <td>{{ this.data.SoDienThoai }}</td>
          </tr>
          <tr>
            <th>Tên vật nuôi</th>
            <td>{{ this.data.UsernameVatNuoi }}</td>
          </tr>
          <tr>
            <th>Chuẩn đoán</th>
            <td colspan="3">{{ this.data.ChanDoan }}</td>
          </tr>
        </table>
        <div class="text-center py-4 fw-bold">CHI TIẾT ĐƠN THUỐC</div>
        <div>
          <div>
            <table class="table">
              <tr>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Sáng</th>
                <th>Trưa</th>
                <th>Chiều</th>
               
                <th colspan="2">Ghi chú</th>
              </tr>
              <tr v-for="element in this.data.ChiTiet">
                <td>{{ element.service }}</td>
                <td>{{ element.soluong }}</td>
                <td>
                  <!-- {{ element.gia }} -->
                  {{
                  new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                    .format(element.gia)
                    .replace("VND", "")
                }}
                </td>
                <td>{{ element.slSang }}</td>
                <td>{{ element.slTrua }}</td>
                <td>{{ element.slChieu }}</td>
               
                <td colspan="2">{{ this.data.GhiChu }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <div class="float-right">
            <div class="row py-2">
              <div class="fw-bold text-center">
                Tổng tiền:
                {{
                  new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                    .format(this.data.ThanhTien)
                    .replace("VND", "")
                }}
              </div>
              <br />
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "./PreDetail.module.css";
</style>
