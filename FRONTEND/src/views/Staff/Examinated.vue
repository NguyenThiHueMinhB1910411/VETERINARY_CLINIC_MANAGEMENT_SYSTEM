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
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft);
import PrescriptionService from "../../services/Prescription.service";


// import { describe } from "node:test";
export default {
    data() {
        return {
            data: {},
            value: {},
            listPrescription: [],
            listPayment: [],
            prescription: null,
            select: {},
            product: {
                description: " Payment for Backlink app",
                price: 9.99
            },
            details:0
        };

    },
    methods: {

        // setLoaded: function () {
        //     paypal
        //         .Buttons({
        //             createOrder: (data, action) => {
        //                 return action.order.create({
        //                     purchase_units: [{
        //                         description: this.product.description,
        //                         amount: {
        //                             currency_code: "USD",
        //                             value: this.product.price
        //                         }
        //                     }]
        //                 });
        //             },
        //             onApprove: async (data, actions, resp) => {
        //                 // const order = await action.order.capture();
        //                 // this.data;
        //                 // submitOrder()
        //                 // this.paidFor = true;
        //                 // this.loading = false;
        //                 // this.submitDomain();
        //                 return actions.order.capture().then(function (details) {
        //                     const {
        //                         payer
        //                     } = details;
        //                     console.log(details);
        //                     // inforData.orderId = details.id;
        //                     // inforData.create_at = details.create_time;

        //                     // addBill({
        //                     //     ...inforData,
        //                     //     thongtinhanhkhach: thongtinhanhkhach
        //                     // });
        //                     setSuccess(true);
        //                     //handleApprove();
        //                 });
        //             },
        //             onError: err => {
        //                 console.log(err);
        //             }
        //         })
        //         .render("#paypal-button-container");
        // },

        submitDomain() {

        },

        async retrievePrescription() {
            try {
                this.listPrescription = await PrescriptionService.getAll();
                this.listPayment = await PaymentService.getAll();
            } catch (error) {
                console.log(error);
            }
            this.retrievePrescription();
        },
        async handleStatus(id, data) {
            const rs = await PrescriptionService.update(id, data);

        },
    },
    // mounted() {
    //     const script = document.createElement("script");
    //     script.src =
    //         "https://www.paypal.com/sdk/js?client-id=ATEMg2mbQ8vBzjmJe5BlUjR-E2swm1lCz5O5c9JhrcNFnIsHKYcoFd881yFPObcHnj05gN3ERU30IIGO";
    //     script.addEventListener("load", this.setLoaded);
    //     document.body.appendChild(script);
    // },
    created() {
        this.retrievePrescription();
        this.handleStatus();
    },
};
</script>
<template>
<main>
    <div>
        <div class="row d-flex pt-3 pl-4">
            <div class="col-7" style="font-size: 16px">

            </div>
            <div class="col-5">
                <input type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
            </div>
        </div>
        <div class="row">
            <div class="">
                <div class="">
                    <div class="pt-3">
                        <div class="row">
                            <div></div>
                        </div>

                        <div class="row">
                            <h3 class="text-center mb-3">Danh sách đã khám</h3>
                            <table class="table table-hover text-center table-bordered table table-bordered" style="
                    font-size: 15px;
                    background-color: white;
                    padding-bottom: 80%;
                    box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); 
                  ">
                                <thead class="">
                                    <tr class="" style="color: #CC4D26">
                                        <th>STT</th>
                                        <th>Tên KH</th>
                                        <th>SĐT</th>
                                        <th>Trạng thái</th>
                                        <th>Ngày kê đơn thuốc</th>
                                        <th>Trạng thái thanh toán</th>
                                        <th>Tổng thanh toán</th>
                                        <th>Thanh toán</th>
                                    </tr>
                                </thead>
                                <tbody class="text-left">
                                    <tr v-for="(prescription, index) in this.listPrescription">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ prescription.info1.TenKhachHang }}</td>
                                        <td>{{ prescription.info1.SoDienThoai }}</td>
                                        <td>{{ prescription.info1.TrangThaiKhamBenh }}</td>
                                        <td>{{ prescription.NgayKeDon }}</td>
                                        <td class="text-primary">
                                            {{ prescription.TrangThaiThanhToan }}
                                        </td>
                                        <td class="">
                                            {{
                          new Intl.NumberFormat("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                            .format(prescription.info2.Gia*prescription.SoLuong)
                            .replace("VND", "")
                        }}
                                        </td>

                                        <td>
                                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal8" @click="this.value = prescription">Thanh toán</button>

                                            <div class="modal fade" id="exampleModal8" tabindex="-1" aria-labelledby="exampleModalLabel8" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title text-dark" id="exampleModalLabel8">
                                                                Thông tin
                                                            </h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div>
                                                                <div>
                                                                    <h5>Thanh toán bằng tiền mặt:</h5>
                                                                    <table class="d-flex justify-content-center">
                                                                        <tr>
                                                                            <td class="">
                                                                                <span>Số tiền cần thanh toán: </span>

                                                                            </td>
                                                                            <td v-if="this.value.info2!== undefined">
                                                                                {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(this.value.info2.Gia*this.value.SoLuong).replace("VND", "") }}
                                                                            </td>

                                                                        </tr>

                                                                    </table>

                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                                Đóng
                                                            </button>
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="
                                    handleStatus({
                                      ...prescription,
                                      TrangThaiThanhToan: 'Đã thanh toán',
                                    })
                                  ">
                                                                Thanh toán
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">
                                                                <font-awesome-icon icon="fa-solid fa-credit-card" class="px-4" />
                                                                <span>Thanh toánnn</span>
                                                            </h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <table>
                                                                <tr>
                                                                    <td class="">
                                                                        <span class="px-2">Số tiền cần thanh toán</span>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="form-control justify-content-center" placeholder="Vui lòng nhập số tiền..." />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="d-flex justify-content-start">
                                                                        <span class="px-2">Tiền nhận được</span>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="form-control" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                                Hủy
                                                            </button>
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="
                                    handleStatus({
                                      ...prescription,
                                      TrangThaiThanhToan: 'Đã thanh toán',
                                    })
                                  ">
                                                                Thanh toán
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped></style>
