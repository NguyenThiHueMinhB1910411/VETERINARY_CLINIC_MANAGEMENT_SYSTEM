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
    faNotesMedical,
    faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faPenToSquare, faNotesMedical, faAddressBook, );

// import listService from "../../services/service.service";
import PrescriptionService from "../../../services/Prescription.service";
import MedicalRecordService from "../../../services/medicalRecord.service";

export default {
    data() {
        return {
            listPrescription: [],
            listMedicalRecord: [],
            Prescription: [],
            listService: [],
            listDoctor: [],
            listStaff: [],
            filtered: [],
            filterService: [],
            select: {},
            value: {},
            dichvu: {},
            data: {},

            statistical: {},
            error: false
        };
    },
    methods: {
        // async handleSubmitMedical(data) {
        //     data.NgayLapHoSo = new Date().toLocaleString("vi-VN", {
        //         timeZone: "Asia/Ho_Chi_Minh",
        //     });
        //     const rs = await MedicalRecordService.create(this.data);

        // },

        
        // async handleSubmitMedical(data) {
        //     this.data.NgayLapHoSo = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
        //     const rs = await MedicalRecordService.create(this.data);

        // },
       
        async retrieveRequire() {
            try {
                this.listPrescription =await PrescriptionService.getAll();
                console.log(this.listPrescription);
                this.listPrescription = this.listPrescription.filter((e) => e.info1.TenLoaiDichVu == "Khám bệnh");
                this.listMedicalRecord = await MedicalRecordService.getAll();
               
               

            } catch(error) {
                console.log(error);
            }
            this.retrieveRequire;
        },
        filteredService(filter) {
            this.filtered = this.listPrescription.filter(e => e.TenLoaiDichVu == filter);

        },

    },

    created() {
        this.retrieveRequire();
    },
};
</script>
<template>
<main>
    <div>
        <div class="row d-flex pt-3 pl-4">
            <div class="col-7 " style="font-size: 20px">
                <!-- <font-awesome-icon icon="fa-solid fa-address-book" class="px-2  col " data-bs-toggle="modal" data-bs-target="#exampleModal2" /> Thêm hồ sơ
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content ">
                            <div class="modal-header">
                                <h5 class="modal-title text-center" id="exampleModalLabel2">
                                    Tạo hồ sơ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="font-size: 16px !important;">
                                <div class="px-3">
                                    <h5>Hồ sơ</h5>
                                    <div class="row">
                                        Mã hồ sơ:
                                        <input type="text" class="form-control" v-model="this.data.MaHoSo" required />
                                    </div>
                                    <div class="row">
                                        Tên chủ vật nuôi:
                                        <input type="text" class="form-control" v-model="this.data.TenKhachHang" required />

                                    </div>
                                    <div class="row">
                                        Số điện thoại:
                                        <input type="text" class="form-control" v-model="this.data.SoDienThoai" required />
                                    </div>
                                    <div class="row">
                                        Tên vật nuôi:
                                        <input type="text" class="form-control" v-model="this.data.UsernameVatNuoi" required />
                                    </div>

                                    <div class="row">
                                        Giới tính:
                                        <input type="text" class="form-control" v-model="this.data.GioiTinh" required />
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>

                                <button type="button" class="btn btn-primary text-light " @click="handleSubmitMedical" data-bs-dismiss="modal">Tạo</button>
                            </div>
                        </div>
                    </div>

                </div> -->
            </div>
            <div class="col-5">
                <form role="search" method="POST" class="search-form" action="/search" name="search-form">
                    <input @input="search($event)" type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0">
                </form>

            </div>
        </div>
        <div>
            <div class="row">
                <div class="py-3">
                    <div class="pt-2">
                        <div class="row">
                            <!--START- TABLE1 -->
                            <table class="table table-hover text-center table-bordered table table-bordered" style=" font-size: 15px; background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);">
                                <thead class="">
                                    <tr class="" style="color: #063555">
                                        <th>STT</th>
                                        <th>Tên khách hàng</th>
                                        <th>Dịch vụ</th>
                                        <th>Ngày đặt</th>
                                        <th>Số điện thoại</th>
                                        <!-- <th>Trạng thái</th> -->

                                        <th>Thao tác</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="text-left">
                                    <tr v-for="(prescription, index) in this
                      .listPrescription">
                                        <th scope="row m-0">{{ index + 1 }}</th>
                                        <td>{{ prescription.info1.TenKhachHang }}</td>
                                        <td>{{ prescription.info1.TenLoaiDichVu }}</td>

                                        <td>{{ prescription.info1.NgayDangKy }}</td>
                                        <td>{{ prescription.info1.SoDienThoai }}</td>
                                    
                                        <td>
                                            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="px-2 text-warning col" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="this.value = prescription " />
                                            <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel6" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content ">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title text-center" id="exampleModalLabel6">
                                                                Chỉnh sửa thông tin đăng ký</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body" style="font-size: 16px !important;">
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        Tên khách hàng:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" v-if="this.value.info1!== undefined" required v-model="this.value.info1.TenKhachHang">
                                                                    </td>
                                                                    <td>
                                                                        Số điện thoại:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-model="this.value.SoDienThoai">
                                                                    </td>
                                                                    <td>
                                                                        Email
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1!== undefined" v-model="this.value.info1.Gmail">
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Tên dịch vụ:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1!== undefined" v-model="this.value.info1.TenDichVu">
                                                                    </td>
                                                                    <td>
                                                                        Tên vật nuôi:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1!== undefined" v-model="this.value.info1.UsernameVatNuoi">
                                                                    </td>
                                                                    <td>
                                                                        Giá:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info2!== undefined" v-model="this.value.info2.Gia">

                                                                    </td>
                                                                    <td>
                                                                        Ghi chú thêm:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info2!== undefined" v-model="this.value.info2.GhiChuThem">
                                                                    </td>
                                                                </tr>

                                                            </table>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                            <!-- <button type="button" class="btn btn-primary text-light "  @click="handleUpdateDoctor(doctor.MaBacSi)" data-bs-dismiss="modal">Lưu</button> -->
                                                            <button type="button" class="btn btn-primary text-light " data-bs-dismiss="modal">Cập nhật</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <router-link :to="{ name: 'InfoExaminated', params: { id: prescription._id } }">
                                                <font-awesome-icon icon="fa-solid fa-circle-info" class="text-dark" />
                                            </router-link>

                                        </td>
                                        <td>

                                            <!-- <router-link :to="{ name: 'MedicalRecord', params: { id: prescription._id } }">
                                                <font-awesome-icon icon="fa-solid fa-notes-medical" class="px-2 text-success" />
                                            </router-link> -->

                                            <router-link :to="{ name: 'PreDetail', params: { id: prescription._id } }">
                                                <font-awesome-icon icon="fa-solid fa-print" class="text-dark" />
                                            </router-link>

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <!-- END-TABLE1 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</main>
</template>

<!-- 

<style scoped>
</style><style>
< !-- .avatar {
    width: 40px !important;
}
</style> -->
