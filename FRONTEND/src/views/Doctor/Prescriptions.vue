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
    faRotateRight,
    faCircleInfo,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faArrowLeft,
    faPenToSquare,
    faNotesMedical,
    faAddressBook,
    faRotateRight,
    faCircleInfo,
    faEye,
);

// import listService from "../../services/service.service";
import PrescriptionService from "../../services/Prescription.service";
import MedicalRecordService from "../../services/medicalRecord.service";

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
            error: false,
        };
    },
    methods: {
        async retrieveRequire() {
            try {
                this.listPrescription = await PrescriptionService.getAll();
                this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TrangThaiPheDuyet == "Đã duyệt"
                    );
               
                this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TrangThaiKhamBenh == "Đã khám"
                    );
                     this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TenLoaiDichVu == "Khám bệnh"
                    );
                this.listMedicalRecord = await MedicalRecordService.getAll();
            } catch (error) {
                console.log(error);
            }

        },
        filteredService(filter) {
            this.filtered = this.listPrescription.filter(
                (e) => e.TenLoaiDichVu == filter
            );
        },
        filteredStatus(filter) {
            this.filtered = this.listPrescription.filter(
                (e) => e.TrangThaiKhamBenh == filter
            );
        },
    },
    created() {
        this.retrieveRequire();
    },
};
</script>
<template>
<main>
    <div class="row my-3">
        <div class="col-4">
            <div class="d-flex">
                <div class="col-7" style="font-size: 16px" @click="retrieveRequire">
                    <button class="btn text-light px-2" style="background-color: #cc4d26">
                        <font-awesome-icon icon="fa-solid fa-rotate-right" />
                        Refresh
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="py-3">
                    <div class="pt-2">
                        <div class="row">
                            <table class="table table-hover text-center table-bordered table table-bordered" style="
                    font-size: 15px;
                    background-color: white;
                    padding-bottom: 80%;
                    box-shadow: 0px 5px 3px rgba(212, 212, 212, 0.25);
                  ">
                                <thead class="">
                                    <tr class="" style="color: #cc4d26">
                                        <th>STT</th>
                                        <th>Khách hàng</th>
                                        <th>Tên vật nuôi</th>
                                        <th>Triệu chứng</th>
                                        <th>Trạng thái</th>
                                        <!-- <th>Chi tiết đơn thuốc</th> -->
                                        <th>Thao tác</th>

                                    </tr>
                                </thead>
                                <tbody class="text-left">
                                    <tr v-for="(prescription, index) in this.listPrescription">
                                        <th scope="row m-0">{{ index + 1 }}</th>
                                        <td>{{ prescription.TenKhachHang }}</td>
                                        <td>{{ prescription.UsernameVatNuoi }}</td>
                                        <td>{{ prescription.MoTa }}</td>
                                        <td>{{ prescription.TrangThaiKhamBenh }}</td>
                                        <td class="d-flex justify-content-center">
                                            <!-- <font-awesome-icon icon="fa-solid fa-pen-to-square" class="px-2 text-warning col" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="this.value = prescription" />
                                            <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel6" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title text-center" id="exampleModalLabel6">
                                                                Chỉnh sửa thông tin đăng ký
                                                            </h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body" style="font-size: 16px !important">
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        Tên khách hàng:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" v-if="this.value.info1 !== undefined" required v-model="this.value.TenKhachHang" />
                                                                    </td>
                                                                    <td>
                                                                        Số điện thoại:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-model="this.value.SoDienThoai" />
                                                                    </td>
                                                                    <td>
                                                                        Email
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1 !== undefined" v-model="this.value.info1.Gmail" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Tên dịch vụ:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1 !== undefined" v-model="this.value.info1.TenDichVu" />
                                                                    </td>
                                                                    <td>
                                                                        Tên vật nuôi:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info1 !== undefined" v-model="
                                          this.value.info1.UsernameVatNuoi
                                        " />
                                                                    </td>
                                                                    <td>
                                                                        Giá:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info2 !== undefined" v-model="this.value.info2.Gia" />
                                                                    </td>
                                                                    <td>
                                                                        Ghi chú thêm:
                                                                        <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required v-if="this.value.info2 !== undefined" v-model="this.value.info2.GhiChuThem" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                                Hủy
                                                            </button>

                                                            <button type="button" class="btn btn-primary text-light" data-bs-dismiss="modal">
                                                                Cập nhật
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->
                                        <td class="px-2">
                                            <router-link :to="{
                            name: 'InfoExaminatedDoctor',
                            params: { id: prescription._id },
                          }">
                                                <font-awesome-icon icon="fa-solid fa-circle-info" class="text-dark" />
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="{
                            name: 'PreDetailDoctor',
                            params: { id: prescription._id },
                          }">
                                                <font-awesome-icon icon="fa-solid fa-eye" class="text-danger" />
                                            </router-link>
                                        </td>

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

<!-- 

<style scoped>
</style><style>
< !-- .avatar {
    width: 40px !important;
}
</style> -->
