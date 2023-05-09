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
} from "@fortawesome/free-solid-svg-icons";
library.add(faMoneyBill, faPrint, faUser, faArrowLeft, faPenToSquare, faMoneyBill, );

import DoctorService from "../../services/doctor.service";

export default {
    data() {
        return {
            doctor:[],
            data: {},
            id: this.$route.params
        };
    },
    methods: {
      

      
        async getInfo(id) {
            try {
                this.data = await DoctorService.get(id);
                console.log(this.data);
                //console.log(this.$route.params);

            } catch (error) {
                console.log(error);
                console.log(this.doctor);
            }
        },

    },
  

    created() {
        this.getInfo(this.$route.params.id);
    },
};
</script>

<template>
    <main>
    <div class="mt-3 mx-4">
        <button type="button" class="text-light mb-4" style="background-color: #063555; border-radius: 8px;">
            <font-awesome-icon icon="fa-solid fa-print" class="px-2" @click="exportToPDF" /> In
        </button>
    </div>
    <div id="element-to-convert">
        <div class="row" style="font-size: 16px;">
            <div class="col mt-4 mx-2 " style="  background-color: white;">
                <h5 class="py-3">THÔNG TIN BÁC SĨ</h5>
                <div class="py-2">
                  
                    <img :src="'/src/assets/images/'+this.data.HinhAnh" alt="" class="image-fluid border border-dark rounded-circle" style="width: 20%;">

                </div>
                <div class="py-2">
                    <b>Họ tên: </b>
                    <span>{{ this.data.TenBacSi }}</span>

                </div>
                <div class="py-2">
                    <b>Mã bác sĩ: </b>
                    <span>{{ this.data.MaBacSi }}</span>

                </div>
                <div class="py-2">
                    <b>Giới tính: </b>
                    <span>{{ this.data.GioiTinh }}</span>

                </div>
                <div class="py-2">
                    <b>Chức vụ: </b>
                    <span>{{ this.data.ChucVu }}</span>

                </div>
                <div class="py-2">
                    <b>Địa chỉ: </b>
                    <span>{{ this.data.DiaChi }}</span>

                </div>
                <div class="py-2">
                    <b>Địa chỉ Email: </b>
                    <span>{{ this.data.Gmail }}</span>

                </div>

          

            </div>

          
            <!-- <div class="col mt-4 mx-2 p-4" style=" box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25); background-color: white;">
 
            </div>
           -->
        </div>
   

    </div>
   

</main>

</template>