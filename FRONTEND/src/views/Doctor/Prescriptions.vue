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
