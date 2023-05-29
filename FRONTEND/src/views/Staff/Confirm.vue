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
    faCheck,
    faInfo,
    faCircleInfo,
    faArrowLeft,
    faRotateRight,
    faArrowsRotate,
    faBan,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faCheck,
    faInfo,
    faCircleInfo,
    faArrowLeft,
    faRotateRight,
    faArrowsRotate,
    faBan,
);

import RegistrationInformationService from "../../services/registrationInformation.service";
export default {
    data() {
        return {
            value: {},
            listRegistrationInformation: [],
            registrationInformation: [],
            filtered: [],
            selected: null,
        };
    },
    methods: {
        async retrieveRequire() {
            try {
                this.listRegistrationInformation =
                    await RegistrationInformationService.getAll();
                this.registrationInformation = this.listRegistrationInformation;

                // this.registrationInformation =
                //   this.registrationInformation.filter(
                //     (e) => e.TrangThaiKhamBenh != "Đã khám"
                //   );
            } catch (error) {
                console.log(error);
            }

        },
        // filteredService(filter) {

        //   this.filtered = this.registrationInformation.filter(
        //     (e) => e.TrangThaiKhamBenh == filter
        //   );
        // },
        async handleSubmit(data) {
            data.NgayDuyet = new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            });

            console.log(data);
            await RegistrationInformationService.update(data);
            this.retrieveRequire();

        },

        search(event) {
            this.registrationInformation = this.listRegistrationInformation.filter(
                (e) =>
                e.TenKhachHang.toLowerCase().includes(event.target.value.toLowerCase()) ||
                e.UsernameVatNuoi.toLowerCase().includes(event.target.value.toLowerCase()) ||
                e.SoDienThoai.includes(event.target.value) ||
                e.TenLoaiDichVu.toLowerCase().includes(event.target.value.toLowerCase()) ||
                e.TrangThaiPheDuyet.toLowerCase().includes(event.target.value.toLowerCase())||
                // e.TenLoaiDichVu.toLowerCase().includes(event.target.value.toLowerCase())||
                e.NgayKham.includes(event.target.value) ||
                e.GioKham.includes(event.target.value) ||
                e.NgayDangKy.includes(event.target.value) 

            );
        },
    },
    created() {
        //  this.getRegistration(this.$route.params.id);
        this.retrieveRequire();
    },
};
</script>
<template>
<main>
    <div>
        <div class="row d-flex pt-3 pl-4">
            <div class="col-7" style="font-size: 16px" @click="retrieveRequire">
                <button class="btn text-light px-2" style="background-color: #cc4d26">
                    <font-awesome-icon icon="fa-solid fa-rotate-right" />
                    Refresh
                </button>

            </div>
            <div class="col-5">
                <form role="search" method="POST" class="search-form" action="/search" name="search-form">
                    <input @input="search($event)" type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
                </form>
            </div>
        </div>

        <div class="row pt-4">
            <table class="table table-hover text-center table-bordered table table-bordered" style="
            font-size: 15px;
            background-color: white;
            padding-bottom: 80%;
            box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); 
          ">
                <thead class="">
                    <tr class="" style="color: #cc4d26">
                        <th>STT</th>
                        <th>Tên Khách hàng</th>
                        <th>Tên vật nuôi</th>
                        <th>SĐT</th>
                        <th>Thời gian gửi</th>
                
                        <th >Ngày khám</th>
                        <th>Giờ khám</th>
                      
                        <th>Loại dịch vụ</th>
                        <th>Trạng thái</th>
                        <th>Tác vụ</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(registrationInformation, index) in this
                .registrationInformation">
                        <td scope="row m-0">{{ index + 1 }}</td>
                        <td>{{ registrationInformation.TenKhachHang }}</td>
                        <td>{{ registrationInformation.UsernameVatNuoi }}</td>

                        <td>{{ registrationInformation.SoDienThoai }}</td>

                        <td>{{ registrationInformation.NgayDangKy }}</td>
                      
                        <td >
                                    {{ registrationInformation.NgayKham }}
                                   
                                    
                                </td>
                                <td> {{ registrationInformation.GioKham }}</td>
                               
                        <td >
                            {{ registrationInformation.TenLoaiDichVu }}
                        </td>
                        <td class="text-primary">{{ registrationInformation.TrangThaiPheDuyet }}</td>
                      

                        <td class=" ">
                          <font-awesome-icon icon="fa-solid fa-check"
                          :class="`text-success px-2
                          ${registrationInformation.TrangThaiPheDuyet== 'Đã duyệt'?'disable':'active'}` 
                          " 
                          
                          :disabled="registrationInformation.TrangThaiPheDuyet== 'Đã duyệt'
                        "
                        @click="
                          handleSubmit({
                              ...registrationInformation,
                              TrangThaiPheDuyet: 'Đã duyệt',
                            })
                        "
                          
                          
                          /> 
                       
                          
                          
                          <font-awesome-icon icon="fa-solid fa-ban"
                          :class="`text-danger px-2
                          ${registrationInformation.TrangThaiPheDuyet== 'Đã hủy'?'disable':'active'}` 
                          " 
                          
                          :disabled="registrationInformation.TrangThaiPheDuyet== 'Đã hủy'
                        "
                        @click="
                          handleSubmit({
                              ...registrationInformation,
                              TrangThaiPheDuyet: 'Đã hủy',
                            })
                        " /> 
                            
                        </td>
                        <td  style="font-size: 13px;">
                          <a class="col px-2">
                                <font-awesome-icon icon="fa-solid fa-circle-info"  style="font-size: 13px;" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="($event) => (this.value = registrationInformation)" />

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title text-dark" id="exampleModalLabel">
                                                    Thông tin đăng ký
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="px-4 py-2">
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên khách hàng:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.TenKhachHang }}
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Gmail:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.Gmail }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Số điện thoại:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.SoDienThoai }}
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên loại vật nuôi:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.TenLoaiVatNuoi }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên vật nuôi:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.UsernameVatNuoi }}
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên loại dịch vụ:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.TenLoaiDichVu }}
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên dịch vụ:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.TenDichVu }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Ngày khám:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.NgayKham }}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Giờ khám:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.GioKham}}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 text-dark d-flex jutify-content-start" style="margin: 0px">
                                                            Tên bác sĩ:
                                                        </div>
                                                        <div class="col-6 text-dark d-flex jutify-content-start">
                                                            {{ this.value.TenBacSi}}
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
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>
</template>

<style>



button:disabled:hover{
  animation: shake 200ms 2;

}
@keyframes shake {
  0%, 100% {translate: 0;}
  25% {translate: 0.125rem;}
  75% {translate: -0.125rem;}
}
</style>
