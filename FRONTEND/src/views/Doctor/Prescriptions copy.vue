

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
    } from "@fortawesome/free-solid-svg-icons";
    library.add(faMoneyBill, faCreditCard, faPrint, faUser, faCircleInfo,
        faPenToSquare, faArrowLeft, );
    import registrationInformationService from "../../services/registrationInformation.service";

    import PrescriptionService from "../../services/Prescription.service";
    import MedicalSuppliesService from "../../services/medicalSupplies.service";

    export default {
        data() {
            return {
                listRegistrationInformation: [],
                filtered: [],
                listPrescription: [],
                listMedicalSupplies: [],
                data: {},
                value: {},
                filterService: [],
                filteredStatus:[],
                filteredDoctor:[],

                prescription: null,
                medicalSupplies: null,
                total:0,
            }
        },
        methods: {

            // async retrieveRequire() {
            //     try {
            //         this.listPrescription = await this.prescription.getAll();
            //         this.listPrescription = this.listPrescription.filter((i) => i.info1.TenBacSi != null);
            //         this.listPrescription = this.listPrescription.filter((e) => e.info1.TrangThaiKhamBenh == "Đã khám" )
            //         this.listPrescription = this.listPrescription.filter((e) => e.info1.TenLoaiDichVu == "Khám bệnh")

            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
            async retrievePrescription() {
                try {
                    this.listPrescription = await PrescriptionService.getAll();
                    this.listPrescription = this.listPrescription.filter((i) => i.info1.TenBacSi != null);
                    this.listPrescription = this.listPrescription.filter((e) => e.info1.TrangThaiKhamBenh == "Đã khám" )
                    this.listPrescription = this.listPrescription.filter((e) => e.info1.TenLoaiDichVu == "Khám bệnh")
                    this.listMedicalSupplies = await MedicalSuppliesService.getAll();

                } catch (error) {
                    console.log(error);
                }
            },
            filteredDoctor(filter) {
                this.filtered = this.listPrescription.filter(i => i.TenBacSi == filter)
            },
            filteredStatus(filter) {
                this.filtered = this.listPrescription.filter(e => e.TrangThaiKhamBenh == filter)
              
            },
            filterService(filter) {
                this.filtered = this.listPrescription.filter(a => a. TenLoaiDichVu== filter)
              
            },

            async handleSubmit() {
                this.data.NgayKeDon = new Date().toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh"
                });
                const result = await PrescriptionService.create(this.data);
                // await registrationInformationService.update(data);
                this.retrievePrescription();
                this.retrieveRequire();
            },
            async handleUpdate(id) {
                this.data.NgayKeDon = new Date().toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh"
            });
            if (window.confirm("Bạn có cập nhật đơn thuốc này này ?")) {
                await PrescriptionService.update(id, this.value);
                this.retrievePrescription();
            }
        },

            // async handleStatus(data) {

            //     await registrationInformationService.update(data);

            // },
        },
        created() {
            this.retrievePrescription();
        }
    }
</script>

<template>
    <main>
        <div>
            <div class="row d-flex  pt-3 pl-4 ">
            <div class="col-7" style="font-size: 16px;">
             
            </div>
            <div class="col-5">
                <input type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0">
            </div>
        </div>
        <div>
            <div class="row">
                <div class="pt-3">

                    <div class="pt-2">
                        <div class="row">
                            <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25);">
                                <thead class="">
                                    <tr class="" style="color: #cc4d26;">
                                        <th>STT</th>
                                        <th>Tên khách hàng</th>
                                        <th>Tên vật nuôi</th>
                                        <th>Vật nuôi</th>
                                        <th>Triệu chứng</th>
                                        <th>Trạng thái</th>
                                        
                                        <th>Chi tiết đơn đơn thuốc</th>
                                        

                                    </tr>
                                </thead>
                                <tbody class="text-left" v-for="(prescription, index) in this
              .listPrescription">
                                    <tr >
                                        <th scope="row m-0">{{ index + 1 }}</th>
                                        <td>{{ prescription.TenKhachHang }}</td>
                                        <td>{{ prescription.UsernameVatNuoi }}</td>
                                        <td>{{ prescription.TenLoaiVatNuoi }}</td>
                                        <td>{{ prescription.MoTa }}</td>
                                        <td class="text-primary">{{ prescription.TrangThaiKhamBenh }}</td>
                                        <td>
                                            <button type="button" class="text-light " style="background-color: #063555; border-radius: 8px;" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="this.value = prescription  ">
                                                Chi tiết đơn thuốc
                                            </button>
                                            <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel6" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel6">Thông tin đơn thuốc</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <table class="table table-hover text-left table-bordered table table-bordered" style="font-size: 15px">
                                                                <thead class="">
                                                                    <tr class="" style="color: #063555;">
                                                                        <th>Dịch vụ</th>
                                                                        <th>Tên thuốc</th>
                                                                        <th>Số lượng thuốc& VTYT</th>
                                                                        <th>Giá</th>
                                                                        <th>Sáng</th>
                                                                        <th>trưa</th>
                                                                        <th>Chiều</th>
                                                                        <th>Thành tiền</th>
                                                                        <th>Ngày kê đơn</th>
                                                                    </tr>
                                                                </thead>
                                                                <!-- <tbody class="text-left">
                                                                    <tr>
                                                                        <td v-if="this.value.info1!== undefined" >{{ this.value.info1.TenLoaiDichVu }}</td>
                                                                        <td v-if="this.value.ChiTiet!== undefined" >{{ this.value.ChiTiet[0].service }}</td>
                                                                        <td v-if="this.value.ChiTiet!== undefined">{{ this.value.ChiTiet[0].soluong }}</td>
                                                                        <td v-if="this.value.ChiTiet!== undefined">
                                                                        
                                                                            {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(this.value.ChiTiet[0].gia).replace("VND", "") }}
                                                                        </td>
                                                                        <td v-if="this.value.ChiTiet!== undefined">{{ this.value.ChiTiet[0].slSang }}</td>
                                                                        <td v-if="this.value.ChiTiet!== undefined">{{ this.value.ChiTiet[0].slTrua }}</td>
                                                                        <td v-if="this.value.ChiTiet!== undefined">{{ this.value.ChiTiet[0].slChieu }}</td>
                                                                       
                                                           
                                                                        <td >
                                                                        
                                                                        {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(this.value.ThanhTien).replace("VND", "") }}
                                                                    </td>
                                                                        <td>{{ this.value.NgayKeDon }}</td>

                                                                    
                                                                    </tr>

                                                                </tbody> -->
                                                            </table>
                                                        </div>
                                                        <div class="modal-footer">

                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
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

        </div>


       
    </main>
</template>
