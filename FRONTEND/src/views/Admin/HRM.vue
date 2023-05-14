<script>
import DoctorService from "../../services/doctor.service";
import StaffService from "../../services/staff.service";
import accountService from "../../services/account.service";
// import {
//     userAccStore
// } from "@/Store/userStore";
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faCircleInfo,
    faPenToSquare,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faCircleInfo,
    faPenToSquare,
    faRotateRight,
);

export default {
    data() {
        return {
            accountService,
            listDoctor: [],
            listStaff: [],
            account: [],
            doctor: null,
            staff: null,
            message: "",
            value: {},
            data: {},
            error: false,
            selectedFile: {},
            info:{}
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

        async retrieveDoctors() {
            try {
                this.listDoctor = await DoctorService.getAll();
                this.listStaff = await StaffService.getAll();

            } catch (error) {
                console.log(error);
            }
        },

        changeFile(e) {
            const file = e.target.files[0];
            this.selectedFile = file;
        },
        buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;
                formData.append(parentKey, value);
            }
        },
        // Thêm bác sĩ
        async handleSubmit() {
            var formData = new FormData();
            formData.append('file', this.selectedFile);
            this.buildFormData(formData, this.data)

            const result = await accountService.register(this.data);
            const rs = await DoctorService.create(formData);
            this.retrieveDoctors();

        },

        async handleCreateStaff() {
            var formData = new FormData();
            formData.append('file', this.selectedFile);

            this.buildFormData(formData, this.data)

            const result = await accountService.register(this.data);
            const rs = await StaffService.create(formData);

        },
        async handleUpdateDoctor(id) {
            if (window.confirm("Bạn có cập nhật doctor này ?")) {
                await DoctorService.update(id, this.value);
                this.retrieveDoctors();
            }
        },
        async handleDeleteDoctor(mabacsi) {
            if (window.confirm("Bạn có muốn xóa doctor này ?")) {
                DoctorService.delete(mabacsi)
                this.retrieveDoctors();
            }
        },
        async handleDeleteStaff(manhanvien) {
            if (window.confirm("Bạn có muốn xóa staff này ?")) {
                StaffService.delete(manhanvien)
                this.retrieveDoctors();
            }
        },

    },
    created() {
        this.retrieveDoctors();
        this.message = "";
    },
}
</script>
<template>
<main>
    <div>
        <div class="row my-3">
            <div class="col-7 ">
                <div class="d-flex">
                    <div style="font-size: 16px" @click="retrieveDoctors">
                        <button class="btn text-light px-2" style="background-color: #cc4d26">
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                <button type="button" class="btn text-light mx-2 px-4" style="background-color:#063555 ;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                    Bác sĩ
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content ">
                            <div class="modal-header">
                                <h5 class="modal-title text-center" id="exampleModalLabel">
                                    <font-awesome-icon icon="fa-solid fa-user-doctor" /> Thêm bác sĩ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="font-size: 16px !important;">
                                <table class="table " style="font-size: 15px;">
                                    <tr class="row">
                                        <td class="col-4">
                                            <p>Họ và tên: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào họ tên" v-model="this.data.TenBacSi" />

                                        </td>
                                        <td class="col-4">
                                            <p>Số điện thoại: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào số điện thoại" v-model="this.data.SoDienThoai" />

                                        </td>
                                        <td class="col-4">
                                            <p>Mã bác sĩ: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào mã bác sĩ" v-model="this.data.MaBacSi" />

                                        </td>

                                    </tr>
                                    <tr class="row py-4">
                                        <td class="col-4">
                                            <p>Địa chỉ: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào địa chỉ" v-model="this.data.DiaChi" />

                                        </td>
                                        <td class="col-4">

                                        <td class="d-flex justify-content-start pb-4">
                                            Giới tính:
                                            <span class="text-danger fw-bold">*</span>
                                        </td>
                                        <td class="pr-2">
                                            <div class="form-check">

                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nam" v-model="this.data.GioiTinh" />
                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                    Nam
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nữ" v-model="this.data.GioiTinh" />
                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                    Nữ
                                                </p>
                                            </div>
                                        </td>

                                        </td>
                                        <td class="col-4">
                                            <p>Chức vụ: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào chức vụ" v-model="this.data.ChucVu" />

                                        </td>
                                        <td class="col-4">
                                            <p>Ảnh: </p>
                                            <input type="file" id="avatar" name="avatar" @change="changeFile" accept="image/png, image/jpeg">

                                        </td>

                                    </tr>
                                    <tr class="row py-2">
                                        <td class="col-4">
                                            <p>Gmail: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào gmail" v-model="this.data.Gmail" />

                                        </td>
                                        <!-- TẠO TÀI KHOẢN TỰ ĐỘNG -->

                                        <td class="col-4">
                                            <p>Tên tài khoản: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào tên tài khoản" v-model="this.data.TenAccount" />

                                        </td>

                                        <td class="col-4">
                                            <p>Password: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào mật khẩu" v-model="this.data.Password" />

                                        </td>

                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSubmit">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn text-light ml-1" style="background-color: #063555;" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                    Nhân viên
                </button>

                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content ">
                            <div class="modal-header">
                                <h5 class="modal-title text-center" id="exampleModalLabel1">
                                    <font-awesome-icon icon="fa-solid fa-user-doctor" /> Thêm nhân viên</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="font-size: 16px !important;">
                                <table class="table " style="font-size: 15px;">
                                    <tr class="row">
                                        <td class="col-4">
                                            <p>Họ và tên: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào họ tên" v-model="this.data.TenNhanVien" />

                                        </td>
                                        <td class="col-4">
                                            <p>Số điện thoại: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào số điện thoại" v-model="this.data.SoDienThoai" />

                                        </td>
                                        <td class="col-4">
                                            <p>Mã nhân viên </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào mã nhân viên" v-model="this.data.MaNhanVien" />

                                        </td>

                                    </tr>
                                    <tr class="row py-4">
                                        <td class="col-4">
                                            <p>Địa chỉ: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào địa chỉ" v-model="this.data.DiaChi" />

                                        </td>
                                        <td class="col-4">
                                            <!-- <p>Giới tính: </p>
                                <input class="col form-control" type="text" placeholder="Nhập vào họ tên" /> -->

                                        <td class="d-flex justify-content-start pb-4">
                                            Giới tính:
                                            <span class="text-danger fw-bold">*</span>
                                        </td>
                                        <td class="pr-2">
                                            <div class="form-check">
                                                <!-- <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="this.data.GioiTinh" checked /> -->
                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nam" v-model="this.data.GioiTinh" />
                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                    Nam
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nữ" v-model="this.data.GioiTinh" />
                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                    Nữ
                                                </p>
                                            </div>
                                        </td>

                                        </td>
                                        <td class="col-4">
                                            <p>Chức vụ: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào chức vụ" v-model="this.data.ChucVu" />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="">
                                            <p>Ảnh: </p>
                                            <!-- <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"> -->
                                            <input type="file" id="avatar" name="avatar" @change="changeFile" accept="image/png, image/jpeg">

                                        </td>
                                    </tr>
                                    <tr class="row py-4">
                                        <td class="col-4">
                                            <p>Địa chỉ email: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào dịa chỉ email" v-model="this.data.Gmail" />

                                        </td>
                                        <td class="col-4">
                                            <p>Tên tài khoản: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào dịa chỉ email" v-model="this.data.TenAccount" />

                                        </td>
                                        <td class="col-4">
                                            <p>Password: </p>
                                            <input class="col form-control" type="text" placeholder="Nhập vào mật khẩu" v-model="this.data.Password" />

                                        </td>

                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" class="btn btn-primary" @click="handleCreateStaff" data-bs-dismiss="modal">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>

                </div>

                
            </div>

        </div>
        <div>
            <div class="row  mt-4">
                <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25);">
                    <thead>
                        <tr style="color:  #cc4d26;">
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Họ và tên</th>
                            <th>Hình ảnh</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Chức vụ</th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">
                        <tr v-for="(doctor, index) in this.listDoctor">
                            <td>{{ index + 1 }}</td>
                            <td>{{ doctor.MaBacSi }}</td>
                            <td>{{ doctor.TenBacSi }}</td>
                            <td style="width: 10%;">
                                <img :src="'/src/assets/images/'+doctor.HinhAnh" alt="" class="img-fluid ">
                            </td>
                            <td>{{ doctor.SoDienThoai }}</td>
                            <td>{{ doctor.DiaChi }}</td>
                            <td>{{ doctor.ChucVu }}</td>
                            <td>
                                <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel5" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title text-dark" id="exampleModalLabel5">
                                                    Thông tin
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Tên bác sĩ:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.TenBacSi }}
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Gmail:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.Gmail }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Số điện thoại:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.SoDienThoai }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Giới tính:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.GioiTinh }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Địa chỉ:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.DiaChi }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark" style="margin: 0px">
                                                            Chức vụ:
                                                        </div>
                                                        <div class="col-6 text-dark">
                                                            {{ this.value.ChucVu }}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> -->
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class=" text-warning col" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="this.value = {...doctor} " />
                                <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel6" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content ">
                                            <div class="modal-header">
                                                <h5 class="modal-title text-center" id="exampleModalLabel6">
                                                    <font-awesome-icon icon="fa-solid fa-user-doctor" /> Chỉnh sửa thông tin bác sĩ</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body" style="font-size: 16px !important;">
                                                <table class="table " style="font-size: 15px;">
                                                    <tr class="row">
                                                        <td class="col-4">
                                                            <p>Họ và tên: </p>
                                                            <input class="col form-control" type="text" placeholder="Nhập vào họ tên" v-model="this.value.TenBacSi" />

                                                        </td>
                                                        <td class="col-4">
                                                            <p>Số điện thoại: </p>
                                                            <input class="col form-control" type="text" placeholder="Nhập vào số điện thoại" v-model="this.value.SoDienThoai" />

                                                        </td>
                                                        <td class="col-4">
                                                            <p>Mã bác sĩ: </p>
                                                            <input class="col form-control" type="text" placeholder="Nhập vào mã bác sĩ" v-model="this.value.MaBacSi" />

                                                        </td>

                                                    </tr>
                                                    <tr class="row py-4">
                                                        <td class="col-4">
                                                            <p>Địa chỉ: </p>
                                                            <input class="col form-control" type="text" placeholder="Nhập vào địa chỉ" v-model="this.value.DiaChi" />

                                                        </td>
                                                        <td class="col-4">

                                                        <td class="d-flex justify-content-start pb-4">
                                                            Giới tính:
                                                            <span class="text-danger fw-bold">*</span>
                                                        </td>
                                                        <td class="pr-2">
                                                            <div class="form-check">

                                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nam" v-model="this.value.GioiTinh" />
                                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                                    Nam
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-check">
                                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Nữ" v-model="this.value.GioiTinh" />
                                                                <p class="form-check-label col" for="flexRadioDefault2">
                                                                    Nữ
                                                                </p>
                                                            </div>
                                                        </td>

                            </td>
                            <td class="col-4">
                                <p>Chức vụ: </p>
                                <input class="col form-control" type="text" placeholder="Nhập vào chức vụ" v-model="this.value.ChucVu" />

                            </td>
                            <td class="col-4">
                                <p>Ảnh: </p>
                                <input type="file" id="avatar" name="avatar" @change="changeFile" accept="image/png, image/jpeg">

                            </td>

                        </tr>
                        <tr class="row py-2">
                            <td class="col-4">
                                <p>Gmail: </p>
                                <input class="col form-control" type="text" placeholder="Nhập vào gmail" v-model="this.value.Gmail" />

                            </td>
                            <!-- TẠO TÀI KHOẢN TỰ ĐỘNG -->

                            <td class="col-4">
                                <p>Tên tài khoản: </p>
                                <input class="col form-control" type="text" placeholder="Nhập vào tên tài khoản" v-model="this.value.TenAccount" />

                            </td>

                            <td class="col-4">
                                <p>Password: </p>
                                <input class="col form-control" type="text" placeholder="Nhập vào mật khẩu" v-model="this.value.Password" />

                            </td>

                        </tr>
                </table>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <!-- <button type="button" class="btn btn-primary text-light "  @click="handleUpdateDoctor(doctor.MaBacSi)" data-bs-dismiss="modal">Lưu</button> -->
                <button type="button" class="btn btn-primary text-light " @click="handleUpdateDoctor(doctor._id)" data-bs-dismiss="modal">Cập nhật</button>
            </div>
        </div>
    </div>

    </div>
    <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger col px-2" @click="handleDeleteDoctor(doctor.MaBacSi)" />
    <router-link :to="{ name: 'InfoDoctor', params: { id: doctor._id } }">
        <font-awesome-icon icon="fa-solid fa-circle-info" class="text-dark" />
    </router-link>
    <!-- <font-awesome-icon icon="fa-solid fa-circle-info" data-bs-toggle="modal" data-bs-target="#exampleModal5" @click="this.value = doctor " /> -->
    </td>
    </tr>
    <tr v-for="(staff, index) in this.listStaff">
        <td>{{ index + 1 }}</td>
        <td>{{ staff.MaNhanVien }}</td>
        <td>{{ staff.TenNhanVien }}</td>
        <td> <img :src="'/src/assets/images/'+staff.HinhAnh" alt="" class="img-fluid ">
        </td>

        <td>{{ staff.SoDienThoai }}</td>
        <td>{{ staff.DiaChi }}</td>
        <td>{{ staff.ChucVu }}</td>
        <td>
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class=" text-warning col" />
            <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger col" @click="handleDeleteStaff(staff.MaNhanVien)" />
            <font-awesome-icon icon="fa-solid fa-circle-info" class=" col" data-bs-toggle="modal" data-bs-target="#exampleModal8" @click="this.value = staff " />

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
                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Tên nhân viên:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.TenNhanVien }}
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Gmail:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.Gmail }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Số điện thoại:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.SoDienThoai }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Giới tính:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.GioiTinh }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Địa chỉ:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.DiaChi }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-dark" style="margin: 0px">
                                        Chức vụ:
                                    </div>
                                    <div class="col-6 text-dark">
                                        {{ this.value.ChucVu }}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                Đóng
                            </button>
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

</main>
</template>

<style scoped>
</style>
