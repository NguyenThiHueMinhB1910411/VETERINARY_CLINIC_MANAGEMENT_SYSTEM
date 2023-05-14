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
   
    faUser,
    faArrowLeft,
    faPenToSquare, 
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faUser, faArrowLeft, faPenToSquare, faMoneyBill, );

// import registrationInformationService from "../../services/registrationInformation.service";
import PrescriptionService from "../../../services/Prescription.service";
import html2pdf from "html2pdf.js";
export default {
    data() {
        return {
            chooseOption: null,
            listPrescription: [],
            Prescription: [],
            product: {
                description: " Payment for Backlink app",
                price: 9.99
            },
            //
            value: {},
            dichvu: {},
            statistical: {},
            data: {},
            id: this.$route.params
        };
    },
    methods: {
        exportToPDF() {
            html2pdf(document.getElementById("element"), {
                margin: 1,
                filename: "bill.pdf",
            });
        },

        async getInfo(id) {
            try {
                const result = await PrescriptionService.getAll();
                this.data = result.filter(e => e._id == id)[0];
                console.log(this.data);

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
<main>
    <div class="my-3">
      <div class="col-4">
        <div class="d-flex">
          <div class="" style="font-size: 16px" >
            <button style="background-color: #cc4d26;"
              class="btn style-button text-light px-2"
              @click="exportToPDF"
            >
              <!-- <font-awesome-icon icon="fa-solid fa-print" class="px-2" /> -->
              Xuất file PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="element">
        <div class="row" style="font-size: 16px;">

            <div class="col mt-4 mx-2 p-4" style=" box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25);  background-color: white;">
                <h5>THÔNG TIN KHÁCH HÀNG</h5>
                <div class="py-2">
                    <b>Tên khách hàng: </b>
                    <span>{{ this.data.TenKhachHang }}</span>
                </div>
                <div class="py-2">
                    <b>Gmail: </b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.Gmail }}</span>
                </div>
                <div class="py-2">
                    <b>Số điện thoại: </b>
                    <span>{{ this.data.SoDienThoai }}</span>
                </div>
                <div class="py-2">
                    <b>Địa chỉ: </b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.DiaChi }}</span>

                </div>

            </div>
            <div class="col mt-4 mx-2 p-4" style=" box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25);  background-color: white;">
                <h5>THÔNG TIN DỊCH VỤ</h5>
                <div class="py-2">
                    <b>Tên loại dịch vụ: </b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.TenLoaiDichVu }}</span>

                </div>
                <div class="py-2">
                    <b>Tên dịch vụ: </b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.TenDichVu }}</span>

                </div>

                <div class="py-2">
                    <b>Tên vật nuôi: </b>
                    <span>{{ this.data.UsernameVatNuoi }}</span>

                </div>

                <!-- <div>
        <b>Giói tính: </b>
        <span>{{ this.data.GioiTinh }}</span>

    </div> -->
                <div class="py-2">
                    <b> Ngày Đăng ký lịch:</b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.NgayDangKy }}</span>

                </div>
                <div class="py-2">
                    <b>Ngày khám: </b>
                    <span v-if="this.data.info1!== undefined">{{ this.data.NgayKham}}</span>

                </div>
                <div class="py-2">
                    <b>Giờ khám: </b>
                    <span >{{ this.data.GioKham}}</span>

                </div>
                <div class="py-2">
                    <b>Giá: </b>
                    <!-- <span v-if="this.data.info2!== undefined">{{ this.data.info2.Gia}}</span> -->
                    <span v-if="this.data.info1!== undefined"> {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(this.data.ThanhTien).replace("VND", "") }}</span>

                </div>
                <!-- <div class="py-2">
        <b>Trạng thái dịch vụ: </b>
        <span v-if="this.data.info1!== undefined">{{ this.data.info1.TrangThaiDichVu}}</span>

    </div> -->

            </div>
        </div>

    </div>

    

</main>
</template>