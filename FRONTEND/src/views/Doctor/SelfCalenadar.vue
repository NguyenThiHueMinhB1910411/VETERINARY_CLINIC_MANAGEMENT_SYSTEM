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
    faCircleInfo,
    faPenToSquare,
    faArrowLeft,
    faAddressBook,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faCircleInfo,
    faPenToSquare,
    faArrowLeft,
    faAddressBook,
    faRotateRight
);
import registrationInformationService from "../../services/registrationInformation.service";

import PrescriptionService from "../../services/Prescription.service";
import MedicalSuppliesService from "../../services/medicalSupplies.service";
import MedicalRecordService from "../../services/medicalRecord.service";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default {
    data() {
        return {
            listRegistrationInformation: [],
       
            listMedicalRecord: [],
            filtered: [],
            listPrescription: [],
            listMedicalSupplies: [],
            data: {},
            value: {},

            select: {},
            prescription: null,
            medicalSupplies: null,
            listMedical: [],
            value: {},
            filtered: [],
        };
    },
    methods: {
        async retrieveRequire() {
            try {
                this.listRegistrationInformation =
                    await registrationInformationService.getAll();
               // this.listRegistrationInformation = await RegistrationInformationService.getAll();
                // this.registrationInformation = this.listRegistrationInformation;
                this.listMedicalRecord = await MedicalRecordService.getAll();
                this.listRegistrationInformation =this.listRegistrationInformation.filter((e) => e.TenBacSi != null);
            } catch (error) {
                console.log(error);
            }
        },
        async retrievePrescription() {
            try {
                this.listPrescription = await PrescriptionService.getAll();
                this.listMedicalSupplies = await MedicalSuppliesService.getAll();
                this.listPrescription = this.listPrescription.filter(
                    (e) => e.TrangThaiKhamBenh == "Chưa khám"
                );
            } catch (error) {
                console.log(error);
            }
        },
        filteredService(filter) {
            this.filtered = this.listRegistrationInformation.filter(
                (e) => e.TenBacSi == filter
            );
            this.filtered = this.listPrescription.filter(
                (e) => e.TrangThaiKhamBenh == filter
            );
        },
        async handleRecord(data) {
            data.NgayLapHoSo = new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            });
            const rs = await MedicalRecordService.create(this.data);
        },

        async handleSubmit() {
            this.data.NgayKeDon = new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            });
            this.data.SoDienThoai = this.select.SoDienThoai;
            this.data.UsernameVatNuoi = this.select.UsernameVatNuoi;
            const result = await PrescriptionService.create({
                ...this.data,
                _id: this.select._id,
            });
            await MedicalRecordService.create(this.select);

            const rs = await this.prescription.update(data);

            this.retrievePrescription();
        },

        async handleStatus(data) {
            //const result = await PrescriptionService.create(this.data);
            await registrationInformationService.update(data);
            this.select = data;

            this.handleStatus();
        },
        async handlePrescription() {
            try {
                await PrescriptionService.update(this.select);
            } catch (error) {
                console.log(error);
            }
            this.retrieveRequire();
            this.handleStatus();
        },
        async addMedical() {
            const findThuoc = await this.MedicalSuppliesService(this.data.TenThuoc);
            console.log(findThuoc);
        },
        // search(event) {
        //     this.registrationInformation = this.listRegistrationInformation.filter(
        //         (e) =>
        //         e.TenKhachHang.toLowerCase().includes(
        //             event.target.value.toLowerCase()
        //         ) || e.SoDienThoai.includes(event.target.value)
        //     );
        // },
    },
    created() {
        this.retrieveRequire();
        this.retrievePrescription();
        this.handleStatus();
    },
};
</script>

<style>
.active {
    background-color: #063555;
    border-radius: 8px;
}

.disable {
    background-color: black;
    border-radius: 8px;
    opacity: 0.5;
}

.style-button {
    background-color: #CC4D26;
    color: white;
}
</style>

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
                <input type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
                <!-- <form role="search" method="POST" class="search-form" action="/search" name="search-form">
                    <input @input="search($event)" type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
                </form> -->
            </div>
        </div>
        <div class="row">
            <div class="pt-3">
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"></div>

                <div class="pt-2">
                    <div class="row">
                        <table class="table table-hover text-center table-bordered table table-bordered" style="
                  font-size: 15px;
                  background-color: white;
                  padding-bottom: 90%;
                  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
                ">
                            <thead class="">
                                <tr class="" style="color: #063555">
                                    <th>STT</th>
                                    <th>Tên Bác sĩ</th>
                                    <th>Tên khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Vật nuôi</th>
                                    <th>Triệu chứng</th>
                                    <th>Trạng thái khám bệnh</th>
                                    <th>Kê đơn thuốc</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="text-left">
                                <tr v-for="(registrationInformation, index) in this
                .listRegistrationInformation">
                                    <th scope="row m-0">{{ index + 1 }}</th>
                                    <td>{{ registrationInformation.TenBacSi }}</td>

                                    <td>{{ registrationInformation.TenKhachHang }}</td>
                                    <td>{{ registrationInformation.SoDienThoai }}</td>
                                    <td>{{ registrationInformation.TenLoaiVatNuoi }}</td>
                                    <td>{{ registrationInformation.MoTa }}</td>
                                    <td class="text-primary">
                                        {{ registrationInformation.TrangThaiKhamBenh }}
                                    </td>
                                    <td>
                                        <button type="button" :class="`text-light ${
                          registrationInformation.TrangThaiKhamBenh == 'Đã khám'
                            ? 'disable'
                            : 'active'
                        }`" data-bs-toggle="modal" data-bs-target="#exampleModal4" @click="
                        handleStatus({
                            ...registrationInformation,
                            TrangThaiKhamBenh: 'Đã khám',
                          }),
                          $router.push({

                            name: 'AddMedical',
                            params: { id: `${registrationInformation._id}` },
                          })

                          // handleStatus({
                          //   ...registrationInformation,
                          //   TrangThaiKhamBenh: 'Đã khám',
                          // })
                        ">
                                            Kê đơn thuốc
                                        </button>
                                    </td>
                                    <td>
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" class=" text-dark col px-2" @click="
                          $router.push({
                            name: 'EditMedical',
                            params: { id: `${registrationInformation._id}` },
                          })" />
                                        <!-- <router-link :to="{ name: 'PreDetail', params: { id: prescription._id } }">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-dark" />
                                            </router-link> -->

                                        <font-awesome-icon icon="fa-solid fa-circle-info" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="this.value = registrationInformation" />

                                        <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel2">
                                                            Chi tiết lịch khám
                                                        </h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 text-dark" style="margin: 0px">
                                                                Tên khách hàng:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.TenKhachHang }}
                                                            </div>
                                                        </div>
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
                                                                Số điện thoại:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.SoDienThoai }}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-dark" style="margin: 0px">
                                                                Email:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.Gmail }}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-dark" style="margin: 0px">
                                                                Tên vật nuôi:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.UsernameVatNuoi }}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-dark" style="margin: 0px">
                                                                Tên dịch vụ:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.TenDichVu }}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 text-dark" style="margin: 0px">
                                                                Trạng thái khám bệnh:
                                                            </div>
                                                            <div class="col-6 text-dark">
                                                                {{ this.value.TrangThaiKhamBenh }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                            Hủy
                                                        </button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                                            Lưu
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
        </div>
    </div>
</main>
</template>
