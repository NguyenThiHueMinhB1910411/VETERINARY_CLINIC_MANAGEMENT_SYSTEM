<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
  faArrowsRotate
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
    // async getRegistration(id) {
    //         try {
    //             this.registrationInformation = await RegistrationInformationService.get(id);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    async retrieveRequire() {
      try {
        this.listRegistrationInformation =
          await RegistrationInformationService.getAll();
        this.registrationInformation = this.listRegistrationInformation;
        //loc theo yêu cầu chưa duyệt
        // this.listRegistrationInformation =
        //   this.listRegistrationInformation.filter(
        //     (e) => e.TrangThaiPheDuyet == "Chờ xác nhận"
        //   );
      } catch (error) {
        console.log(error);
      }
      // this.retrieveRequire();
    },
    async handleSubmit(data) {
      data.NgayDuyet = new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      console.log(data);
      await RegistrationInformationService.update(data);
      this.retrieveRequire();
    },
    //     search(ten) {
    //   this.registrationInformation = this.listRegistrationInformation.filter(e => e.TenKhachHang.toLowerCase().includes(ten.target.value.toLowerCase()))
    // }
    search(event) {
      this.registrationInformation = this.listRegistrationInformation.filter(
        (e) =>
          e.TenKhachHang.toLowerCase().includes(
            event.target.value.toLowerCase()
          ) || e.SoDienThoai.includes(event.target.value)
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
      </div>

      <div class="row pt-4">
        <table
          class="table table-hover text-center table-bordered table table-bordered"
          style="
            font-size: 15px;
            background-color: white;
            padding-bottom: 80%;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
          "
        >
          <thead class="">
            <tr class="" style="color: #cc4d26">
              <th>STT</th>
              <th>Tên Khách hàng</th>
              <!-- <th>Email</th> -->
              <th>SĐT</th>

              <th>Thời gian gửi</th>
              <th>Thời gian khám</th>
              <th>Loại dịch vụ</th>
              <th>Xác nhận</th>
              <th>Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(registrationInformation, index) in this
                .registrationInformation"
            >
              <th scope="row m-0">{{ index + 1 }}</th>
              <td>{{ registrationInformation.TenKhachHang }}</td>
              <!-- <td>{{ registrationInformation.Gmail }}</td> -->
              <td>{{ registrationInformation.SoDienThoai }}</td>

              <td>{{ registrationInformation.NgayDangKy }}</td>
              <td>{{ registrationInformation.NgayKham }}</td>
              <td>{{ registrationInformation.TenLoaiDichVu }}</td>
              <td class="text-primary">
                {{ registrationInformation.TrangThaiPheDuyet }}
              </td>
              <td class="row m-0">


                      <a
                       :class="` col-6 ${registrationInformation.TrangThaiPheDuyet== 'Đã duyệt'?'disable':'active'}` "
                        
                  @click="
                    handleSubmit({
                      ...registrationInformation,
                      TrangThaiPheDuyet: 'Đã duyệt',
                    })
                  "
                >
                  <font-awesome-icon
                    icon="fa-solid fa-check text-success me-1 "
                  />
                </a>



                <!-- <a
                  class="text-success col-6"
                  @click="
                    handleSubmit({
                      ...registrationInformation,
                      TrangThaiPheDuyet: 'Đã duyệt',
                    })
                  "
                >
                  <font-awesome-icon
                    icon="fa-solid fa-check text-success me-1 "
                  />
                </a>
 -->


                <a class="col-6" style="color: #063555">
                  <font-awesome-icon
                    icon="fa-solid fa-circle-info"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="($event) => (this.value = registrationInformation)"
                  />

                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title text-dark"
                            id="exampleModalLabel"
                          >
                            Thông tin đăng ký
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="px-4 py-2">
                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Tên khách hàng:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.TenKhachHang }}
                              </div>
                            </div>

                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Gmail:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.Gmail }}
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Số điện thoại:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.SoDienThoai }}
                              </div>
                            </div>

                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Tên loại vật nuôi:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.TenLoaiVatNuoi }}
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Tên vật nuôi:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.UsernameVatNuoi }}
                              </div>
                            </div>

                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Tên loại dịch vụ:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.TenLoaiDichVu }}
                              </div>
                            </div>

                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Tên dịch vụ:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.TenDichVu }}
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                                style="margin: 0px"
                              >
                                Ngày khám:
                              </div>
                              <div
                                class="col-6 text-dark d-flex jutify-content-start"
                              >
                                {{ this.value.NgayKham }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
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
.active{
  color: green;
}
.disable{
  color: red;
  opacity: 0.5;
}
</style>
