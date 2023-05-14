<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMoneyBill,
  faCreditCard,
  faPrint,
  faUser,
  faArrowLeft,
  faPenToSquare,
  faAdd,
    faRotateRight,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMoneyBill,
  faCreditCard,
  faPrint,
  faUser,
  faArrowLeft,
  faPenToSquare,
  faAdd,
    faRotateRight,
    faCircleInfo,
);

import registrationInformationService from "../../../services/registrationInformation.service";

import DoctorService from "../../../services/doctor.service";
import StaffService from "../../../services/staff.service";
export default {
  data() {
    return {
      listRegistrationInformation: [],
      registrationInformation: [],
      //listRegistrationInformationTemp: [],
      listService: [],
      listDoctor: [],
      listStaff: [],
      filtered: [],
      filterService: [],
      select: {},
      value: {},
      dichvu: {},
      statistical: {},
    };
  },
  methods: {

    async getDoctor(id) {
      try {
        this.doctor = await DoctorService.get(id);
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

    async handleSubmit() {
      try {
        // await registrationInformationService.update(this.select);
        await registrationInformationService.update(this.value);
      } catch (error) {
        console.log(error);
      }
     
    },

    filteredService(filter) {
      this.filtered = this.listRegistrationInformation.filter(
        (i) => i.TenLoaiDichVu == filter
      );
    },
    async retrieveRequire() {
      try {
        this.listRegistrationInformation =
          await registrationInformationService.getAll();

        this.listRegistrationInformation =
          this.listRegistrationInformation.filter(
            (e) => e.TenLoaiDichVu != "Khám bệnh"
          );

        this.listRegistrationInformation =
          this.listRegistrationInformation.filter(
            (e) => e.TrangThaiPheDuyet == "Đã duyệt"
          );
        this.listRegistrationInformation =
          this.listRegistrationInformation.filter(
            (i) => i.TenLoaiDichVu != "Khám bệnh"
          );

        this.statistical.all = this.listRegistrationInformation.length;

        // this.statistical.LamDep = this.listRegistrationInformation.filter(
        //   (i) => i.TenLoaiDichVu == "Làm đẹp"
        // ).length;
        // this.statistical.NoiTru = this.listRegistrationInformation.filter(
        //   (i) => i.TenLoaiDichVu == "Nội trú"
        // ).length;
        // this.statistical.KhamBenh = this.listRegistrationInformation.filter(
        //   (i) => i.TenLoaiDichVu == "Khám bệnh"
        // ).length;
        this.registrationInformation = this.listRegistrationInformation;
        // console.log(this.listRegistrationInformation);
      } catch (error) {
        console.log(error);
      }
    },
    async handleStatus(data) {
      await registrationInformationService.update(data);
      this.retrieveRequire();
    },
    filteredDangKy(filter) {
      this.filtered = this.listRegistrationInformation.filter(
        (e) => e.TrangThaiPheDuyet == filter
      );
    },
    filteredDoctor(filter) {
      this.filtered = this.listRegistrationInformation.filter(
        (e) => e.TenBacSi == filter
      );
    },
    filteredDichVu(filter) {
      this.filtered = this.listRegistrationInformation.filter(
        (i) => i.TenLoaiDichVu == filter
      );
    },
    search(event) {
      this.registrationInformation = this.listRegistrationInformation.filter(
        (e) =>
        e.TenKhachHang.toLowerCase().includes(event.target.value.toLowerCase()) 
        ||e.UsernameVatNuoi.toLowerCase().includes(event.target.value.toLowerCase()) 
        ||e.TenLoaiDichVu.toLowerCase().includes(event.target.value.toLowerCase()) 
        || e.SoDienThoai.includes(event.target.value)
        || e.NgayKham.includes(event.target.value)
                || e.GioKham.includes(event.target.value)

      );
    },
 
    
  },

  created() {
    this.retrieveDoctors();
    this.retrieveRequire();
  },
};
</script>
<template>
  <main>
    <div>
     
      <div>
        <div class="row my-3">
            <div class="col-7">
                <div class="d-flex">
                    <div class="" style="font-size: 16px;" @click="retrieveRequire">
                        <button class="btn style-button text-light px-2">

                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                 

                </div>

            </div>
            <div class="col-5">
          <form
            role="search"
            method="POST"
            class="search-form"
            action="/search"
            name="search-form"
          >
            <input
              @input="search($event)"
              type="search"
              placeholder="Search"
              class="form-control w-75 d-flex justify-content-right mr-0"
            />
          </form>
        </div>
          <div class="py-3">
          

            <div class="pt-2">
              <div class="row">
                <!--START- TABLE1 -->
                <table
                  class="table table-hover text-center table-bordered table table-bordered"
                  style="
                    font-size: 15px;
                    background-color: white;
                    padding-bottom: 80%;
                    box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); 
                  "
                >
                  <thead class="">
                    <tr class="" style="color: #CC4D26">
                      <th>STT</th>
                      <th>Chủ vật nuôi</th>
                      <th>Vật nuôi</th>
                      <th>Dịch vụ</th>
                      <th>Ngày</th>
              <th>Giờ</th>
                      <th>Số điện thoại</th>
                      <!-- <th>Trạng thái</th> -->
                      <th>Thực hiện</th>
                      <th>Thanh toán</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody class="text-left">
                    <!-- <tr v-for="(registrationInformation, index) in this
                      .registrationInformation"> -->
                    <tr
                      v-for="(registrationInformation, index) in this
                        .registrationInformation"
                    >
                      <th scope="row m-0">{{ index + 1 }}</th>
                      <td>{{ registrationInformation.TenKhachHang }}</td>
                      <td>{{ registrationInformation.UsernameVatNuoi }}</td>
                      <td>{{ registrationInformation.TenLoaiDichVu }}</td>

                      <td>{{ registrationInformation.NgayKham }}</td>
              <td>{{ registrationInformation.GioKham }}</td>
                      <td>{{ registrationInformation.SoDienThoai }}</td>
                      
                      <td>
                        <button
                        type="button"
                        :class="` ${registrationInformation.TrangThaiDichVu== 'Hoàn tất'?'disable2':'active2'}` "
                        
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal4"
                        :disabled="registrationInformation.TrangThaiDichVu== 'Hoàn tất'"
                        @click="
                          handleStatus({
                              ...registrationInformation,
                              TrangThaiDichVu: 'Hoàn tất',
                            })
                        "
                      >
                      {{ registrationInformation.TrangThaiDichVu }}
                      </button>
                      </td>
                      <td>
                        <button
                        type="button"
                        :class="`text-light ${registrationInformation.ThanhToan== 'Đã thanh toán'?'disable1':'active1'}` "
                        
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal4"
                        :disabled="registrationInformation.ThanhToan== 'Đã thanh toán'"
                        @click="
                          handleStatus({
                              ...registrationInformation,
                              ThanhToan: 'Đã thanh toán',
                            })
                        "
                      >
                      {{ registrationInformation.ThanhToan }}
                      </button>
                      </td>
                     
                      <td>
                        <font-awesome-icon
                          icon="fa-solid fa-pen-to-square"
                          class="px-2 text-warning col"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal6"
                          @click="this.value = registrationInformation"
                        />
                        <div
                          class="modal fade"
                          id="exampleModal6"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel6"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  class="modal-title text-center"
                                  id="exampleModalLabel6"
                                >
                                  Chỉnh sửa thông tin đăng ký
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div
                                class="modal-body"
                                style="font-size: 16px !important"
                              >
                                <table>
                                  <tr>
                                    <td>
                                      Tên khách hàng:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.TenKhachHang"
                                      />
                                    </td>
                                    <td>
                                      Số điện thoại:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.SoDienThoai"
                                      />
                                    </td>
                                    <td>
                                      Email
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.Gmail"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Tên dịch vụ:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.TenDichVu"
                                      />
                                    </td>
                                    <td>
                                      Tên vật nuôi:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.UsernameVatNuoi"
                                      />
                                    </td>
                                    <td>
                                      Giá:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.Gia"
                                      />
                                    </td>
                                    <td>
                                      Ghi chú thêm:
                                      <input
                                        type="text"
                                        class="form-control w-100 my-2"
                                        id="formGroupExampleInput"
                                        required
                                        v-model="this.value.GhiChuThem"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Hủy
                                </button>
                              
                                <button
                                  type="button"
                                  class="btn btn-primary text-light"
                                  @click="
                                    handleSubmit(registrationInformation._id)
                                  "
                                  data-bs-dismiss="modal"
                                >
                                  Cập nhật
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <router-link
                          :to="{
                            name: 'InfoBooked',
                            params: { id: registrationInformation._id },
                          }"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-circle-info"
                            class="text-dark"
                          />
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

<style scoped>
.active2{
  background-color: #063555;
  border-radius: 8px;
  color: white;
}


.disable2 {
  background-color: #1491c2;
  color: white;
  border-radius: 8px;
  opacity: 0.9;
  
}
/* .disable2 {
  background-color: rgb(211, 204, 204);
  color: black;
  border-radius: 8px;
  border: 2px gray solid;
  font-weight: bold;
  
} */
button:disabled:hover{
  animation: shake 200ms 2;

}
@keyframes shake {
  0%, 100% {translate: 0;}
  25% {translate: 0.125rem;}
  75% {translate: -0.125rem;}
}
.active1 {
  background-color: #063555;
  border-radius: 8px;
  color: white;
  
}
.disable1 {
  background-color: #069653c4;
  
  border-radius: 8px;
  box-shadow: 2px 2px 4px #ececec;

 
  
}

.style-button{
    background-color: #CC4D26;
    color: white;
}
.style-button-add{
    background-color: #153A64;
    color: white;

}
.title-page{
    font-size: 31px; 
    font-weight:500; 
    color: #153A64;
}
</style>
