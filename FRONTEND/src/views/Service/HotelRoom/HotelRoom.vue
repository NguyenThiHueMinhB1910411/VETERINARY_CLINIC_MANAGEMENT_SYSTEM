<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue";
import ServiceService from "../../../services/service.service";
import CategoryService from "../../../services/categoryService.service";
import RegistrationInformationService from "../../../services/registrationInformation.service";
import StaffService from "../../../services/staff.service";
import {
    userAccStore
} from "@/Store/userStore";
export default {
    components: {
        PublicFooters,
        HeaderPublic,
        CategoryService,
    },
    data() {
        const account = userAccStore();
        return {
            ListService: [],

            categoryService: [],
            filtered: [],
            staff: {},

            data: {
                service: "Lưu trú",
                payment: ""
            },
            account

        }
    },
    methods: {
        async retriveStaff() {
            try {
                this.staff = await StaffService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveServices() {
            try {

                
                this.ListService = await ServiceService.getAll();
                this.ListService = this.ListService.filter((e) => e.MaLoaiDichVu == "DV1")
            } catch (error) {
                console.log(error);
            }
        },
        filteredService(filter) {
            this.filtered = this.ListService.filter(e => e.MaLoaiDichVu == filter)
        },
        async handleSubmit() {
            this.data.TenAccount = this.account.user.TenAccount,
                this.data.NgayDangKy = new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh"
                });

            const rs = await RegistrationInformationService.create(this.data);
           

        },

    },
    mounted() {
        this.retrieveServices();
        this.retriveStaff();
    }
  
};
</script>

<template>
<HeaderPublic />
<main class="">
    <div class="price-list ">
       
        <div class="m-5 pb-5">
            <table class="table table-hover text-center table-bordered table table-bordered ">
                <tr class="text-light  tablet set-bg fw-normal">
                    <th colspan="6 " class="text-center">Bảng giá cả dịch vụ</th>
                </tr>
                <tr class="set-bg text-light">
                    <td colspan="1"><br /></td>
                    <td colspan="3">Cân nặng</td>
                </tr>
                <tr class="set-bg text-light text-center">
                    <td>Giá theo giờ</td>
                    <td>0-7kg</td>
                    <td>7kg trở lên</td>
                    <!-- <td>Trên 10kg</td> -->
                </tr>

                <tr class="text-center">
                    <td>Thời gian</td>
                    <td>12000 đ/Giờ</td>
                    <td>20000 đ/Giờ</td>
                </tr>
                <tr v-for="(service, index) in this.ListService" class="text-center">
                    <td>{{service.TenDichVu}}</td>
                    <td colspan="" class=" px-5 py-1 "> {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(service.GiaCoVua).replace("VND", "") }}</td>
                    <td colspan="" class=" px-5 py-1 "> {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(service.GiaCoLon).replace("VND", "") }}</td>
                  
                </tr>

            </table>
            <div class="d-flex-justify-content-center">
                <div class="">
                    <button type="button" class="btn btn-danger text-light  border border-light mt-4" style="font-size: 18px;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Đăng ký dịch vụ
                    </button>

                </div>

            </div>

        </div>

    </div>

    <!-- table -->
    <div class="d-flex justify-content-center">
        <div class="m-1 p-2">

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-uppercase" id="exampleModalLabel">
                                Đăng ký dịch vụ
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tr>
                                    <input type="radio" id="track" value="Nội trú" v-model="this.data.TenLoaiDichVu" /><label>Nội trú</label><br />

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
                                            <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault3" v-model="this.data.GioiTinh" />
                                            <p class="form-check-label col" for="flexRadioDefault2">
                                                Đực
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault3" v-model="this.data.GioiTinh" />
                                            <p class="form-check-label col" for="flexRadioDefault2">
                                                Cái
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                             
                                <tr class="">
                                    <td class="title-info">
                                        Cân nặng :
                                        <span class="text-danger fw-bold">*</span>
                                    </td>
                                    <td colspan="2">
                                        <input type="number" min="1" max="30" class="form-control w-100" id="formGroupExampleInput" required placeholder="Nhập vào trọng lượng" v-model="this.data.CanNang" />
                                    </td>
                                </tr>
                                <tr class="create-space">
                                    <td>
                                        Tên dịch vụ:
                                        <span class="text-danger fw-bold">*</span>
                                    </td>
                                    <td>
                                        <select v-model="this.data.TenDichVu">
                                            <option v-for="(service, index) in this.ListService">

                                                {{service.TenDichVu }}</option>

                                        </select>
                                    </td>
                                </tr>
                                <tr class="create-space">
                                                <td>
                                                    Tên nhân viên:
                                                    <span class="text-danger fw-bold">*</span>
                                                </td>
                                                <td>
                                                    <select v-model="this.data.TenNhanVien">
                                                        <option v-for="(staff, index) in this.staff" :value="staff.TenNhanVien">
                                                            {{ staff.TenNhanVien }}
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                <div>
                                  

                                </div>

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
                                <div class="box-timeslot" style="margin-top: 20px; margin-bottom: 15px"></div>
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
                                            <input type="tel" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="formGroupExampleInput" placeholder="Nhập vào số điện thoại" v-model="this.data.SoDienThoai" required />
                                        </div>
                                        <div class="form-group">
                                            <p class="">
                                                Địa chỉ : <span class="text-danger fw-bold">*</span>
                                            </p>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào địa chỉ của bạn" v-model="this.data.DiaChi" required />
                                        </div>
                                        <div class="form-group">
                                            <p class="">
                                                Email : <span class="text-danger fw-bold">*</span>
                                            </p>
                                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nhập vào email của bạn" v-model="this.data.Gmail" required />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit" data-bs-dismiss="modal">
                                Đặt lịch ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<PublicFooters />
</template>

<style scoped>
@import "./HotelRoom.module.css";
</style>
