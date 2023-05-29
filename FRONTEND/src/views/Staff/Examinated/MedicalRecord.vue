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
    faCircleInfo,
    faAddressBook,faRotateRight,

} from "@fortawesome/free-solid-svg-icons";
    faCircleInfo,
library.add(faMoneyBill, faCreditCard, faPrint, faUser, faArrowLeft, faPenToSquare, faNotesMedical, faAddressBook,faRotateRight, );

import MedicalRecordService from "../../../services/medicalRecord.service";

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
                this.MedicalRecord = this.listMedicalRecord;
            
            } catch (error) {
                console.log(error);
            }
        },
        search(event) {
            this.MedicalRecord = this.listMedicalRecord.filter(
                (e) =>
                e.TenKhachHang.toLowerCase().includes(event.target.value.toLowerCase()) 
               ||e.ChiTiet.UsernameVatNuoi.toLowerCase().includes(event.target.value.toLowerCase()) 
               ||e.SoDienThoai.includes(event.target.value) 

            );
        },
    },
    created() {
        this.retriveMedicalRecord();
    }

}
</script>
<template>
<div>
    <div class="row d-flex pt-3 pl-4">
        <div class="col-7 ">
                <div class="d-flex">
                    <div class="col-7" style="font-size: 16px" @click="retriveMedicalRecord">
          <button class="btn text-light px-2" style="background-color: #cc4d26">
            <font-awesome-icon icon="fa-solid fa-rotate-right" />
            Refresh
          </button>
        </div>
                   

                </div>

            </div>
            <div class="col-5">
                <form role="search" method="POST" class="search-form" action="/search" name="search-form">
                    <input @input="search($event)" type="search" placeholder="Search" class="form-control w-75 d-flex justify-content-right mr-0" />
                </form>
            </div>
        <div class="py-3">
            <div class="pt-2">
                <div class="row">
                    <table class="table table-hover text-center table-bordered table table-bordered" style=" font-size: 15px; background-color: white;padding-bottom: 80%;box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); ">
                        <thead class="">
                            <tr class="" style="color: #CC4D26">
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Tên vật nuôi</th>
                                <th>Số điện thoại</th>
                                <th>Chi tiết</th>

                            </tr>
                        </thead>
                        <tbody class="text-left">
                            <tr v-for="(medicalRecord, index) in this
                      .MedicalRecord">
                                <th scope="row m-0">{{ index + 1 }}</th>
                                <td>{{ medicalRecord.TenKhachHang }}</td>
                                <td>{{ medicalRecord.ChiTiet.UsernameVatNuoi }}</td>
                                <td>{{ medicalRecord.SoDienThoai }}</td>
                                <td>
                                     <router-link :to="{ name: 'InfoMedicalRecord', params: { id: medicalRecord._id, UsernameVatNuoi: medicalRecord.ChiTiet.UsernameVatNuoi } }">
                                                <!-- <font-awesome-icon icon="fa-solid fa-notes-medical" class="px-2 text-success" /> -->
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
