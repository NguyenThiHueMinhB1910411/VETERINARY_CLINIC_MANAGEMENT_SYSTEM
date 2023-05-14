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
    faRotateRight,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faRotateRight, faPlus, );

import registrationInformationService from "../../services/registrationInformation.service";
import DoctorService from "../../services/doctor.service";
import StaffService from "../../services/staff.service";
import RegistrationInformationService from "../../services/registrationInformation.service";
export default {
    data() {
        return {
            listRegistrationInformation: [],
            listDoctor: [],
            listStaff: [],
            filtered: [],
            filterService: [],
            registrationInformation: [],
            select: {},
            data: {},

            statistical: {},

        }

    },
    methods: {
        async getDoctor(id) {
            try {
                this.doctor = await DoctorService.get(id);

            } catch (error) {
                console.log(error);
            }
        },
        async getStaff(id) {
            try {
                this.staff = await StaffService.get(id);

            } catch (error) {
                console.log(error);
            }
        },

        async handleSubmitForm() {

            this.data.NgayDangKy = new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh"
            });

            const rs = await RegistrationInformationService.create(this.data);
            //   const  result = await PrescriptionService.create(this.data);
            // this.$router.push("/Confirm");

        },

        async retrieveDoctors() {
            try {
                this.listDoctor = await DoctorService.getAll();
                this.listStaff = await StaffService.getAll();

            } catch (error) {
                console.log(error);
            }
        },

        async retrieveRequire() {
            try {
                this.listRegistrationInformation = await registrationInformationService.getAll();
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TrangThaiPheDuyet == "Đã duyệt");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaiDichVu == "Khám bệnh");
                this.registrationInformation = this.listRegistrationInformation;
            } catch (error) {
                console.log(error);
            }

        },
        async retrieveService() {
            try {

                this.listRegistrationInformation = this.listRegistrationInformation.filter((i) => i.TenLoaiDichVu == "Khám bệnh");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((i) => i.TenLoaiDichVu == "Nội trú");
                this.listRegistrationInformation = this.listRegistrationInformation.filter((i) => i.TenLoaiDichVu == "Làm đẹp");

            } catch (error) {
                console.log(error);
            }

        },
        search(event) {
            this.registrationInformation = this.listRegistrationInformation.filter(
                (e) =>
                e.TenKhachHang.toLowerCase().includes(event.target.value.toLowerCase()) ||
                e.SoDienThoai.includes(event.target.value) ||
                e.TenLoaiDichVu.toLowerCase().includes(event.target.value.toLowerCase()) ||
                e.TrangThaiPheDuyet.toLowerCase().includes(event.target.value.toLowerCase())

            );
        },
        filteredDangKy(filter) {
            this.filtered = this.listRegistrationInformation.filter(e => e.TrangThaiPheDuyet == filter);
        },

        filteredService(filter) {
            this.filterService = this.listRegistrationInformation.filter(i => i.TenLoaiDichVu == filter);

        },
        search(event) {
            this.registrationInformation = this.listRegistrationInformation.filter(
                (e) =>
             
                e.UsernameVatNuoi.toLowerCase().includes(event.target.value.toLowerCase()) 
                || e.SoDienThoai.includes(event.target.value)
                || e.NgayKham.includes(event.target.value)
                || e.GioKham.includes(event.target.value)

            );
        },

    },
    created() {

        this.retrieveRequire();
    }
}
</script>
<template>
<main>
    <div>

        <div class="row">
            <div class="">

                <div class=" row  my-3">

                    <div class="col-7">
                        <div class="d-flex">
                            <div class="" style="font-size: 16px;" @click="retrieveRequire">
                                <button class="btn style-button text-light px-2">

                                    <font-awesome-icon icon="fa-solid fa-rotate-right" />
                                    Refresh
                                </button>

                            </div>
                            <button type="button" class="btn style-button-add mx-2 text-light mb-2 " data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Thêm
                            </button>

                        </div>

                        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalToggleLabel">Đăng ký khám bệnh</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <table>

                                            <tr class="create-space">
                                            </tr>
                                            <tr>
                                                <input type="radio" id="track" value="Khám bệnh" v-model="this.data.TenLoaiDichVu" /><label>Khám bệnh</label><br />

                                            </tr>
                                            <tr class="">
                                                <td class="title-info">
                                                    Tên vật nuôi :
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td colspan="2">
                                                    <input type="text" class="form-control w-100" id="formGroupExampleInput" required placeholder="Nhập vào tên vật nuôi" v-model="this.data.UsernameVatNuoi" />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td class="d-flex justify-content-start">
                                                    Vật nuôi là:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input class="form-check-input " type="radio" name="flexRadioDefault1" id="flexRadioDefault2" value="Chó" v-model="this.data.TenLoaiVatNuoi" />
                                                        <p class="form-check-label col" for="flexRadioDefault2">
                                                            Chó
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input class="form-check-input " type="radio" name="flexRadioDefault1" id="flexRadioDefault2" value="mèo" v-model="this.data.TenLoaiVatNuoi" />
                                                        <p class="form-check-label col" for="flexRadioDefault2">
                                                            Mèo
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex justify-content-start">
                                                    Giới tính:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <!-- <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="this.data.GioiTinh" checked /> -->
                                                        <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="this.data.GioiTinh" />
                                                        <p class="form-check-label col" for="flexRadioDefault2">
                                                            Đực
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-check">
                                                        <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="this.data.GioiTinh" />
                                                        <p class="form-check-label col" for="flexRadioDefault2">
                                                            Cái
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="create-space">
                                                <td>
                                                    Tên dịch vụ:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <select id="" name="" v-model="this.data.TenDichVu">
                                                        <option>Kiểm tra sức khỏe</option>
                                                        <option>Tiêm ngừa</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex justify-content-start">Mô tả tình trạng:</td>
                                                <td>
                                                    <textarea id="story" name="story" rows="5" cols="50" v-model="this.data.MoTa">
    Nói sơ về tình trạng bệnh...
    </textarea>

                                                </td>

                                            </tr>
                                            <tr class="create-space">
                                                <td>
                                                    Thời gian đặt hẹn:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <input type="date" v-model="this.data.NgayKham" />
                                                </td>
                                            </tr>
                                            <tr class="create-space">
                                                <td>

                                                    <label for="appt-time">Chọn giờ: </label>
                                                </td>

                                                <td>

                                                    <input id="appt-time" type="time" name="appt-time" v-model="this.data.GioKham" />

                                                </td>

                                            </tr>

                                        </table>
                                        <div class="form-group">
                                            <div class="box-timeslot" style="margin-top: 20px; margin-bottom: 15px">
                                            </div>
                                            <hr />
                                            <h5 class="text-center modal-title text-uppercase mb-2">
                                                Thông tin của bạn
                                            </h5>
                                            <div>
                                                <form action="">
                                                    <div class="form-group">
                                                        <p class="">
                                                            Họ và tên của bạn :
                                                            <span class="text-danger fw-bold">*</span>
                                                        </p>
                                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào họ tên của bạn" v-model="this.data.TenKhachHang" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <p class="">
                                                            Số điện thoại :
                                                            <span class="text-danger fw-bold">*</span>
                                                        </p>
                                                        <!-- <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required> -->
                                                        <input type="tel" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào số điện thoại" v-model="this.data.SoDienThoai" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <p class="">
                                                            Địa chỉ : <span class="text-danger fw-bold">*</span>
                                                        </p>
                                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào địa chỉ của bạn" v-model="this.data.DiaChi" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <p class="">
                                                            Gmail : <span class="text-danger fw-bold">*</span>
                                                        </p>
                                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào email của bạn" v-model="this.data.Gmail" required />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" @click="handleSubmitForm()">Gửi</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                            <div class="modal-dialog modal-xm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalToggleLabel2">Thông báo</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn đã đăng ký dịch vụ thành công
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-5">
                        <form role="search" method="POST" class="search-form" action="/search" name="search-form">
                            <input @input="search($event)" type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
                        </form>
                    </div>

                </div>

                <div>
                    <div class="row">

                        <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%;box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); ">
                            <thead>
                                <tr style="color: #CC4D26;">
                                    <th>STT</th>
                                    <th>Tên vật nuôi</th>
                                    <th>Dịch vụ</th>
                                    <th>Giờ khám</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Tên bác sĩ</th>
                                </tr>
                            </thead>
                            <tbody class="text-left">
                                <tr v-for="(registrationInformation, index) in this
              .registrationInformation">
                                    <th scope="row m-0">{{ index + 1 }}</th>
                                    <td>{{ registrationInformation.UsernameVatNuoi }}</td>
                                    <td>{{ registrationInformation.TenLoaiDichVu }}</td>

                                    <td> {{ registrationInformation.GioKham }}&nbsp;
                                        {{ registrationInformation.NgayKham }}</td>
                                    <td>{{ registrationInformation.SoDienThoai }}</td>
                                    <td>{{ registrationInformation.TrangThaiPheDuyet}}</td>
                                    <td>{{ registrationInformation.TenBacSi }}

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
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
    font-size: 30px;
    font-weight: 500;
    color: #153A64;
}
</style>
