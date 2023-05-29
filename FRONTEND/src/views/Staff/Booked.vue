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
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faAdd, faRotateRight, );

import registrationInformationService from "../../services/registrationInformation.service";
import DoctorService from "../../services/doctor.service";
import StaffService from "../../services/staff.service";
export default {
    data() {
        return {
            listRegistrationInformation: [],
            listDoctor: [],
            listStaff: [],
            filtered: [],
            filterService: [],
            select: {},

            statistical: {},

        }

    },
    methods: {

        async retrieveDoctors() {
            try {
                this.listDoctor = await DoctorService.getAll();
                this.listStaff = await StaffService.getAll();

            } catch (error) {
                console.log(error);
            }
        },

        async handleSubmit() {
            try {
                await registrationInformationService.update(this.select);
            } catch (error) {
                console.log(error);
            }
            this.retrieveRequire();
        },

        async retrieveRequire() {
            try {

                this.listRegistrationInformation = await registrationInformationService.getAll();
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TrangThaiPheDuyet == "Đã duyệt");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaiDichVu == "Khám bệnh");
                // this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TrangThaiDichVu == "Chưa khám");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenBacSi == null);
            } catch (error) {
                console.log(error);
            }
            this.retrieveRequire;

        },
        async retrieveService() {
            try {

                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaiDichVu == "Khám bệnh");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaiDichVu == "Nội trú");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaeDichVu == "Làm đẹp");

            } catch (error) {
                console.log(error);
            }

        },
        filteredDangKy(filter) {
            this.filtered = this.listRegistrationInformation.filter(e => e.TrangThaiPheDuyet == filter);
        },

        filteredService(filter) {
            this.filtered = this.listRegistrationInformation.filter(e => e.TenLoaiDichVu == filter);

        },
        filteredDoctor(filter) {
            // this.filtered = this.listRegistrationInformation.filter(e => e.TenBacSi == filter);
            this.filtered = this.listRegistrationInformation.filter(e => e.TrangThaiDichVu == filter);

        },

    },
    mounted() {

      
        this.retrieveRequire();
        this.retrieveService();
        this.retrieveDoctors();
    }
}
</script>
<template>
<main>
    <div>

        <div class="row my-3">

            <div class="col-4">
                <div class="d-flex">
                    <div class="" style="font-size: 16px;" @click="retrieveRequire">
                        <button class="btn style-button text-light px-2">

                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                   

                </div>

            </div>
            <div class="col-8">
                <!-- <p class="title-page" style="">Dịch vụ đã đăng k</p> -->
            </div>

            <div class="pt-4">
                <div class="row">
                    <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); ">
                        <thead class="">
                            <tr class="" style="color: #CC4D26">
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Dịch vụ</th>
                                <th>Ngày đặt</th>
                                <th >Giờ khám</th>
                                <th>Số điện thoại</th>
                                <th>Trạng thái</th>
                                <th>Chọn bs/ nv</th>
                            </tr>
                        </thead>
                        <tbody class="text-left">
                            <tr v-for="(registrationInformation, index) in this
              .listRegistrationInformation">
                                <th scope="row m-0">{{ index + 1 }}</th>
                                <td>{{ registrationInformation.TenKhachHang }}</td>
                                <td>{{ registrationInformation.TenLoaiDichVu }}</td>

                                <td>{{ registrationInformation.NgayDangKy }}</td>
                                <td >
                                    {{ registrationInformation.GioKham }} &nbsp;
                                    {{ registrationInformation.NgayKham }}
                                    
                                </td>
                                <td>{{ registrationInformation.SoDienThoai }}</td>
                                <td>{{ registrationInformation.TrangThaiPheDuyet }}</td>
                                <td>
                                    <!-- Button trigger modal -->

                                    <button type="button" class="btn select-doctor" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="this.select=registrationInformation">

                                        Chọn
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-scrollable modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Danh sách bác sĩ</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <table class="table table-hover text-left table-bordered table table-bordered" style="font-size: 15px">
                                                        <thead class="">
                                                            <tr class="text-danger">
                                                                <th>Họ và tên</th>
                                                                <th>Chức vụ</th>
                                                                <th>Chọn</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody class="text-left">
                                                            <tr v-for="(doctor, index) in this.listDoctor ">
                                                                <!-- <th scope="row m-0">{{ index + 1 }}</th> -->
                                                                <td>{{ doctor.TenBacSi }}</td>
                                                                <td>{{ doctor.ChucVu }}</td>
                                                                <!-- <td> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked   :value="doctor.TenAccount"></td> -->

                                                                <td> <input class="form-check-input" :value="doctor.TenBacSi" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="this.select.TenBacSi"></td>

                                                            </tr>
                                                       
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                    <button type="button" class="btn btn-primary" @click="handleSubmit()" data-bs-dismiss="modal">Chọn</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>

</main>
</template>

<style scoped>
.style-button {
    background-color: #CC4D26;
    color: white;
}

.style-button-add {
    background-color: #153A64;
    color: white;

}

.title-page {
    font-size: 31px;
    font-weight: 500;
    color: #153A64;
}
.select-doctor{
    background-color: #153A64;
    color: white;
}
</style>
