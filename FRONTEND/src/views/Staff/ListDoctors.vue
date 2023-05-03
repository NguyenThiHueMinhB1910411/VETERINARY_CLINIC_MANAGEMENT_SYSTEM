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
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faCalendarDays);

import DoctorService from "../../services/doctor.service";
import  registrationInformationService from "../../services/registrationInformation.service";

export default {
    data() {
        return {
            listDoctor: [],
            listRegistrationInformation: [],

        }
    },
    methods: {
        async retrieveDoctors() {
            try {
                this.listDoctor = await DoctorService.getAll();

            } catch (error) {
                console.log(error);
            }
            this.retrieveDoctors();
        },

        async retrieveRegistrationInformation() {
            try {
                this.listRegistrationInformation = await registrationInformationService.getAll();
            } catch (error) {
                console.log(error);
            }
            this.retrieveRegistrationInformation();
        },
       
    },
    created() {
        this.retrieveDoctors();
        this.retrieveRegistrationInformation();
    }
}
</script>
<template>
<main>
    <div>
        <div class="row">
            <div>
                <h4 class="text-dark text-center text-uppercase fs-700 py-4">
                    Thêm bác sĩ vào lịch khám
                </h4>
            </div>
            <table class="table table-hover text-center table-bordered table table-bordered" style="font-size: 15px">
                <thead class="">
                    <tr class="text-danger">
                      <th>STT</th>
                        <th>Chức vụ</th>
                        <th>Tên Bác sĩ</th>
                        
                        <th>Xếp lịch</th>
                    </tr>
                </thead>
                <tbody class="text-left">
                    <tr v-for="(doctor, index) in this.listDoctor">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>{{ doctor.ChucVu }}</td>
                       
                        <td>{{ doctor.TenBacSi }}</td>
                        <td>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Chọn
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Danh sách lịch còn trống</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table table-hover text-center table-bordered table table-bordered" style="font-size: 15px">
                            <thead class="">
                                <tr class="text-danger">
                                    <th>STT</th>
                                    <th>Tên khách hàng</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Ngày đặt</th>
                                    <th>Ngày duyệt</th>
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody class="text-left">
                                <tr v-for="(registrationInformation, index) in this
              .listRegistrationInformation">
                                    <th scope="row m-0">{{ index + 1 }}</th>
                                    <td>{{ registrationInformation.TenKhachHang }}</td>
                                    <td>{{ registrationInformation.TenDichVu }}</td>

                                    <td>{{ registrationInformation.NgayDangKy }}</td>
                                    <td>{{ registrationInformation.NgayDuyet }}</td>
                                    <td> <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></td>

                                </tr>
                            </tbody>
                        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Gửi</button>
      </div>
    </div>
  </div>
</div>
              
              </td>

                    </tr>
                    <!-- <tr>
              <td class="text-left">01</td>
              <td class="text-left">Nguyễn Văn An</td>
              <td>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  style="width: 40px !important"
                  class="avatar"
                  alt=""
                />
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Chọn
                </button>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5
                          class="modal-title text-center text-uppercase mt-4"
                          id="exampleModalLabel"
                        >
                          Đăng ký khám bệnh
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body modal-add">
                        <table>
                          <tr>
                            <td class="pt-6 pb-2 px-1" style="">
                              Tên người giám hộ
                            </td>
                            <td class="py-2">
                              <input
                                class="col form-control"
                                type="text"
                                placeholder="Nhập tên người giám hộ"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 px-1 d-flex justify-content-start">
                              Số điện thoại
                            </td>
                            <td class="py-2">
                              <input
                                type="phone"
                                name=""
                                id=""
                                class="form-control"
                                placeholder="Nhập vào số điện thoại"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 px-1 d-flex justify-content-start">
                              Email
                            </td>
                            <td class="py-2">
                              <input
                                type="email"
                                name=""
                                id=""
                                class="form-control"
                                placeholder="Nhập vào email"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="d-flex justify-content-start">
                              Vật nuôi là:
                              <span class="text-danger fw-bold">*</span>
                            </td>
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked
                                />
                                <p
                                  class="form-check-label col"
                                  for="flexRadioDefault2"
                                >
                                  Chó
                                </p>
                              </div>
                            </td>
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked
                                />
                                <p
                                  class="form-check-label col"
                                  for="flexRadioDefault2"
                                >
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
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked
                                />
                                <p
                                  class="form-check-label col"
                                  for="flexRadioDefault2"
                                >
                                  Male
                                </p>
                              </div>
                            </td>
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked
                                />
                                <p
                                  class="form-check-label col"
                                  for="flexRadioDefault2"
                                >
                                  Female
                                </p>
                              </div>
                            </td>
                          </tr>

                          <tr class="create-space">
                            <td>
                              Thời gian đặt hẹn:
                              <span class="text-danger fw-bold">*</span>
                            </td>
                            <td>
                              <input type="date" />
                            </td>
                          </tr>

                          <tr>
                            <td class="pt-6 pb-2 px-1" style="">
                              Chọn giờ
                            </td>
                            <td class="py-2">
                                <input
                                type="text"
                                placeholder="Thời theo khung thời gian 48h"
                                class="form-control"
                                required
                              />
                            </td>
                          </tr>

                        </table>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary text-light"
                          data-bs-dismiss="modal"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary text-light"
                        >
                          Hoàn tất
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</main>
</template>
