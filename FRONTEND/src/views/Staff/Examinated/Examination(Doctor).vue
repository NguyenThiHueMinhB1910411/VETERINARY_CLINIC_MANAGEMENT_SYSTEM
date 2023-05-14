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
    faPenToSquare,
    faNotesMedical,
    faAddressBook,
    faRotateRight,
    faCircleInfo,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faArrowLeft,
    faPenToSquare,
    faNotesMedical,
    faAddressBook,
    faRotateRight,
    faCircleInfo,
    faEye,
);

// import listService from "../../services/service.service";
import PrescriptionService from "../../../services/Prescription.service";
import MedicalRecordService from "../../../services/medicalRecord.service";
import registrationInformationService from "../../../services/registrationInformation.service";

export default {
    data() {
        return {
            listRegistrationInformation: [],
            registrationInformation: [],
            listPrescription: [],
            listMedicalRecord: [],
            Prescription: [],
            listService: [],
            listDoctor: [],
            listStaff: [],
            filtered: [],
            filterService: [],
            select: {},
            value: {},
            dichvu: {},
            data: {},

            statistical: {},
            error: false,
        };
    },
    methods: {
        async handleStatus(data) {
            await registrationInformationService.update(data);
            this.retrieveRequire();
        },
        async retrieveRequire() {
            try {
                this.listPrescription = await PrescriptionService.getAll();
                this.listRegistrationInformation =
                    await registrationInformationService.getAll();
                this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TrangThaiPheDuyet == "Đã duyệt"
                    );
                this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TrangThaiKhamBenh == "Đã khám"
                    );
                this.listPrescription =
                    this.listPrescription.filter(
                        (e) => e.TenLoaiDichVu == "Khám bệnh"
                    );

                this.listMedicalRecord = await MedicalRecordService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        filteredService(filter) {
            this.filtered = this.listPrescription.filter(
                (e) => e.TenLoaiDichVu == filter
            );
        },
        filteredStatus(filter) {
            this.filtered = this.listPrescription.filter(
                (e) => e.TrangThaiKhamBenh == filter
            );
        },
    },
    created() {
        this.retrieveRequire();
    },
};
</script>
<template>
<main>
    <div class="row my-3">
        <div class="col-4">
            <div class="d-flex">
                <div class="col-7" style="font-size: 16px" @click="retrieveRequire">
                    <button class="btn text-light px-2" style="background-color: #cc4d26">
                        <font-awesome-icon icon="fa-solid fa-rotate-right" />
                        Refresh
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="py-3">
                    <div class="pt-2">
                        <div class="row">
                            <table class="table table-hover text-center table-bordered table table-bordered" style="
                    font-size: 15px;
                    background-color: white;
                    padding-bottom: 80%;
                    box-shadow: 0px 5px 3px rgba(212, 212, 212, 0.25);
                  ">
                                <thead class="">
                                    <tr class="" style="color: #cc4d26">
                                        <th>STT</th>
                                        <th>Tên vật nuôi</th>
                                        <th>Dịch vụ</th>
                                        <th>Ngày khám</th>
              <th>Giờ khám</th>
                                        <th>Số điện thoại</th>
                                        <th>Thanh toán</th>
                                        <th>Thao tác</th>

                                    </tr>
                                </thead>
                                <tbody class="text-left">
                                    <tr v-for="(prescription, index) in this.listPrescription">
                                        <th scope="row m-0">{{ index + 1 }}</th>
                                        <td>{{ prescription.UsernameVatNuoi }}</td>
                                        <td>{{ prescription.TenLoaiDichVu }}</td>

                                        <td>{{ prescription.NgayKham }}</td>
              <td>{{ prescription.GioKham }}</td>
                                        <td>{{ prescription.SoDienThoai }}</td>
                                        <td>
                                            <button type="button" :class="`text-light ${prescription.ThanhToan== 'Đã thanh toán'?'disable1':'active1'}` "
                                              :disabled="prescription.ThanhToan== 'Đã thanh toán'" @click="
                          handleStatus({
                              ...prescription,
                              ThanhToan: 'Đã thanh toán',
                            })
                        ">
                                                {{ prescription.ThanhToan }}
                                            </button>

                                        </td>

                                        <td class="d-flex justify-content-center">
                                        <td>
                                            <router-link :to="{
                            name: 'InfoExaminated',
                            params: { id: prescription._id },
                          }">
                                                <font-awesome-icon icon="fa-solid fa-circle-info" class="text-dark" />
                                            </router-link>
                                        </td>
                                        <td class="px-2">
                                            <router-link :to="{
                            name: 'PreDetail',
                            params: { id: prescription._id },
                          }">
                                                <font-awesome-icon icon="fa-solid fa-eye" class="text-dark" />
                                            </router-link>
                                        </td>

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

<style scoped>

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
</style>
