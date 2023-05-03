<!-- <script>
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
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faPenToSquare, faNotesMedical, faAddressBook, );

import MedicalRecordService from "../../services/medicalRecord.service";

export default {
    data() {
        return {
            listMedicalRecord: [],
            MedicalRecord: [],
            data: {},
        }
    },
    methods: {
        async retriveMedicalRecord() {
            try {
                this.listMedicalRecord = await MedicalRecordService.getAll();
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.retriveMedicalRecord();
    }

}
</script>
<template>
<div>
    <div class="row">
        <div class="py-3">
            <div class="pt-2">
                <div class="row">
                    
                    <table class="table table-hover text-center table-bordered table table-bordered" style=" font-size: 15px; background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);">
                        <thead class="">
                            <tr class="" style="color: #063555">
                                <th >STT</th>
                                <th>Tên khách hàng</th>
                                <th>Tên vật nuôi</th>
                                <th>Dịch vụ</th>
                                <th>Số điện thoại</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody class="text-left">
                            <tr v-for="(medicalRecord, index) in this
                      .listMedicalRecord">
                                <th scope="row m-0">{{ index + 1 }}</th>
                                <td>{{ medicalRecord.info2.TenKhachHang }}</td>
                                <td>{{ medicalRecord.info2.UsernameVatNuoi }}</td>

                                <td>{{ medicalRecord.info2.TenLoaiDichVu }}</td>

                                <td>{{ medicalRecord.SoDienThoai }}</td>
                                <td>
                                     <router-link :to="{ name: 'InfoMe', params: { id: medicalRecord._id } }">
                                                <font-awesome-icon icon="fa-solid fa-notes-medical" class="px-2 text-success" />
                                            </router-link>
                                </td>
                          
                            

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template> -->

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
    faAddressBook,faRotateRight,

} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faPenToSquare, faNotesMedical, faAddressBook,faRotateRight, );

import MedicalRecordService from "../../services/medicalRecord.service";

export default {
    data() {
        return {
            listMedicalRecord: [],
            MedicalRecord: [],
            data: {},
        }
    },
    methods: {
        async retriveMedicalRecord() {
            try {
                this.listMedicalRecord = await MedicalRecordService.getAll();
                // console.log(this.listMedicalRecord);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.retriveMedicalRecord();
    }

}
</script>
<template>
<div>
    <div class="row my-3">
        <div class="col-4 ">
                <div class="d-flex">
                    <div class="col-7" style="font-size: 16px" @click="retriveMedicalRecord">
          <button class="btn text-light px-2" style="background-color: #cc4d26">
            <font-awesome-icon icon="fa-solid fa-rotate-right" />
            Refresh
          </button>
         
        </div>
                   

                </div>

            </div>
        <div class="py-3">
            <div class="pt-2">
                <div class="row">
                    <table class="table table-hover text-center table-bordered table table-bordered" style=" font-size: 15px; background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);">
                        <thead class="">
                            <tr class="" style="color: #063555">
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Tên vật nuôi</th>
                                <th>Số điện thoại</th>
                                <th>Chi tiết</th>

                            </tr>
                        </thead>
                        <tbody class="text-left">
                            <tr v-for="(medicalRecord, index) in this
                      .listMedicalRecord">
                                <th scope="row m-0">{{ index + 1 }}</th>
                                <td>{{ medicalRecord.TenKhachHang }}</td>
                                <td>{{ medicalRecord.ChiTiet.UsernameVatNuoi }}</td>
                                <td>{{ medicalRecord.SoDienThoai }}</td>
                                <td>
                                     <router-link :to="{ name: 'InfoMe', params: { id: medicalRecord._id, UsernameVatNuoi: medicalRecord.ChiTiet.UsernameVatNuoi } }">
                                              
                                                <font-awesome-icon icon="fa-solid fa-circle-info" />
                                            </router-link>
                                </td>
                          
                            

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.style-button {
    background-color: #CC4D26;
    color: white;
}
</style>

