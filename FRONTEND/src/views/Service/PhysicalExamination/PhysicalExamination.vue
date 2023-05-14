<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue";
import ServiceService from "../../../services/service.service";
import CategoryService from "../../../services/categoryService.service";
import DoctorService from "../../../services/doctor.service";
import RegistrationInformationService from "../../../services/registrationInformation.service";
import accountService from "../../../services/account.service";
import Datepicker from 'vuejs3-datepicker';

import {
    userAccStore
} from "@/Store/userStore";

export default {

    components: {
        PublicFooters,
        HeaderPublic,
        CategoryService,

        ServiceService,
        accountService,
        Datepicker,
    },
    data() {

        const account = userAccStore();

        return {
            listPrescription: [],
            listDoctor: [],
            prescription: null,
            listRegistrationInformation: [],
            service: [],
            categoryService: [],
            value: {},
            data: {},
            doctor: {},
            account,
        }
    },
    methods: {
        async checkLogin() {
            if (!userStore.user.TenAccount != "Login") {
                this.$router.push({
                    name: "Login"
                });
            }
        },

        async retrieveService() {
            try {
                this.service = await ServiceService.getAll();
                this.categoryService = await CategoryService.getAll();
                // this.listDoctor = await listDoctor.getAll();
                //         this.listDoctor = this.listDoctor.filter(
                //   (e) => e.TenBacSi != null
                // );
            } catch (error) {
                console.log(error);
            }
        },
        async retriveDoctor() {
            try {
                this.doctor = await DoctorService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async handleSubmit() {
            this.data.TenAccount = this.account.user.TenAccount,
                this.data.NgayDangKy = new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh"
                });

            const rs = await RegistrationInformationService.create(this.data);
            //   const  result = await PrescriptionService.create(this.data);
            // this.$router.push("/Confirm");

        },
    },

    created() {
        this.retrieveService();
        this.retriveDoctor();
    },

};
</script>
<template>
<HeaderPublic />
<main>

    <div class="d-flex justify-content-center container">

        <div class="m-1 p-2 ">
            <h2 class="title-right text-center fw-bold" style="font-size:40px;">Chuẩn đoán và điều trị</h2>
            <div class="d-flex justify-content-center pb-3">
                <img src="../../../assets/images/logo-cat-dog.png" alt="">
            </div>
            <div class="row">

                <div class="col-6 p-3">
                    <p class="attention">Lưu ý:</p>
                    <div>Lịch hẹn có hiệu lực sau khi được xác nhận chính thức từ VETERINARY CLINIC.</div>
                    <div>Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai
                        thông tin họ tên, điện thoại, việc xác nhận cuộc hẹn sẽ không có hiệu lực.</div>
                    <div>Quý khách sử dụng dịch vụ Đặt hẹn trực tuyến, xin vui lòng đặt trước ít nhất là 24 giờ trước
                        khi đến khám.</div>
                    <div>Trong những trường hợp khẩn cấp hoặc nghi ngờ có các triệu chứng nguy hiểm, quý khách nên hoặc
                        <span class="text-danger fw-bold"> ĐẾN TRỰC TIẾP</span> hoặc <span class="text-danger fw-bold">
                            0909 326 482 </span>để kịp thời xử lý.</div>

                    <div class="pt-4">

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
                                            <tr class="create-space">
                                                <td>
                                                    Tên bác sĩ:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <select v-model="this.data.TenBacSi">
                                                        <option v-for="(doctor, index) in this.doctor" :value="doctor.TenBacSi">
                                                            {{ doctor.TenBacSi }}
                                                        </option>
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
                                            <tr class="">
                                    <td>
                                        Thời gian đặt hẹn
                                        <span class="text-danger fw-bold">*</span>:
                                    </td>
                                    <td>
                                        <input type="date" id="demo" min="2023-05-15" max="2023-08-30" v-model="this.data.NgayKham" />
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
                                        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" @click="handleSubmit">Gửi</button>
                                        <!-- 
                                        <button type="button" class="btn btn-primary" @click="handleSubmit" data-bs-dismiss="modal">
                                            Đăng ký
                                        </button> -->
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
                        <a class="btn btn-primary text-light px-5" style="font-size: 20px;" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Đăng ký ngay</a>

                    </div>

                </div>

                <div class="col-6 p-3">
                    <img src="../../../assets/images/physicalExamination-img.webp" alt="" class="img-fluid">
                </div>

            </div>

        </div>
    </div>
</main>
<PublicFooters />
</template>

<style scoped>
@import "./PhysicalExamination.module.css";
</style>
