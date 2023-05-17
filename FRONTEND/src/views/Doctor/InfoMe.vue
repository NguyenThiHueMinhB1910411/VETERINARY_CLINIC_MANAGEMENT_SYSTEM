
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

import MedicalRecordService from "../../services/medicalRecord.service";
export default {
    data() {
        return {
            chooseOption: null,
            listMedicalRecord: [],
            MedicalRecord: [],
            product: {
                description: " Payment for Backlink app",
                price: 9.99,
            },
            //
            value: {},
            dichvu: {},
            statistical: {},
            data: {},
            filtered: [],
            id: this.$route.params,
        };
    },
    methods: {
      
        submitDomain() {},
        async retriveMedicalRecord() {
            try {
                this.listMedicalRecord = await MedicalRecordService.getAll();
                this.listMedicalRecord = this.listMedicalRecord.filter(
                    (i) => i.TenLoaeDichVu == "Khám bệnh"
                );
                // console.log(this.listMedicalRecord);
            } catch (error) {
                console.log(error);
            }
        },
        async getInfo(id) {
            try {
                const result = await MedicalRecordService.getAllInfo();
                this.data = result.filter(
                    (e) =>
                    e._id == id &&
                    e.registrationInformation.UsernameVatNuoi ==
                    this.$route.params.UsernameVatNuoi
                );
                // console.log(this.data)
                console.log("data", this.data);
            } catch (error) {
                console.log(error);
                console.log(this.MedicalRecord);
            }
        },
        filtered(filter) {
            this.filter = this.MedicalRecordService.filter(
                (i) => i.TenLoaiDichVu == filter
            );
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
    <div class="row" style="font-size: 16px">
        <div class="col mt-4 mx-2 p-4" style="
          background-color: white;
        ">
            <h4 class="text-center">Hồ sơ khám bệnh</h4>

            <div v-for="(e, i) in this.data">

                <div v-for="(el, idx) in e.prescription">
                    <div class="row">
                        <div class="py-2 row">
                            <div class="col">
                                <b>Mã lần khám: </b>
                                <span> {{ el._id }}</span>

                            </div>
                            <div class="col d-flex justify-content-end">
                                <b>Ngày kê đơn thuốc: </b> &nbsp;
                                <span>{{ el.NgayKeDon }}</span>

                            </div>

                        </div>
                        <div class="py-2 row">
                            <div class="col">
                                <b>Tên khách hàng: </b>
                                <span>{{ el.TenKhachHang }}</span>

                            </div>
                            <div class="col d-flex justify-content-end">
                                <b>Số điện thoại: </b> &nbsp;
                                <span>{{ el.SoDienThoai }}</span>

                            </div>

                        </div>
                        <div class="py-2 row">
                            <div class="row">
                                <b>Tên vật nuôi: </b>
                            <span>{{ el.UsernameVatNuoi }}</span>

                            </div>
                            <div class="col d-flex justify-content-end">
                                <b>Ngày tái khám: </b> &nbsp;
                                <span>
                                    {{ el.NgayTaiKham }} - 
                                    {{ el.GioTaiKham }}
                                </span>

                            </div>
                            
                        </div>
                        <div class="py-2">
                            <span class="col"><b>Chuẩn đoán: </b> {{ el.ChanDoan }}</span>
                        </div>
                        <div class="py-2">
                            <b>Ghi chú: </b>
                            <span>{{ el.GhiChu }}</span>
                        </div>
                        <div>

                            <table class="table table-border">
                                <tr>
                                    <th>STT</th>
                                    <th>Tên thuốc</th>
                                    <th>Số lượng</th>
                                    <th>Sáng uống</th>
                                    <th>Trưa uống</th>
                                    <th>Chiều uống</th>
                                    <th>Giá</th>

                                </tr>
                                <tr v-for="(element, idx) in el.ChiTiet">
                                    <td>{{ idx + 1 }}</td>
                                    <td>{{ element.service }}</td>
                                    <td>{{ element.soluong }}</td>
                                    <td>{{ element.slSang }}</td>
                                    <td>{{ element.slChieu }}</td>
                                    <td>{{ element.slToi }}</td>
                                    <td>{{
                    new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                      .format(element.gia)
                      .replace("VND", "")
                  }}</td>

                                </tr>
                            </table>

                        </div>
                        <div class="d-flex justify-content-end">
                            <span class=""><b>Tổng tiền: </b> {{
                    new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                      .format(el.ThanhTien)
                      .replace("VND", "")
                  }}</span>

                        </div>

                        <div>

                        </div>
                    </div>

                    <div style="background-color: aliceblue"></div>
                    <hr />
                </div>

            </div>
        </div>
    </div>
</main>
</template>

<style scoped>
.btn-service {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 7px 0px 7px 0px;
    margin: 20px;
    cursor: pointer;
}

.btn-service:hover {
    background-color: white;
    border: 1px solid;
    color: black;
}
</style>
