<script>
import FeedbackService from "../../services/feedbackservice";

import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faEyeSlash,
    faEye,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faEye,
    faRotateRight,
);

export default {
    data() {
        return {
            listFeedback: [],
            data: {},
        }
    },
    methods: {
      
        async retrieveFeedback() {
            try {
                this.listFeedback = await FeedbackService.getAll();
                this.listFeedback = this.listFeedback.filter((e) => e.info.TrangThaiDichVu == "Hoàn tất");
            } catch (error) {
                console.log(error);
            }
        },
        filtered(filter) {
            this.filtered = this.listFeedback.filter(e => e.TrangThaiDichVu == filter);

        },
       

    },
   
    created() {
       
        this.retrieveFeedback();
    },
}
</script>
<template>
<main >
    <div>
        <div class="row my-3">
            <div class="col-4 ">

                <div class="d-flex">
                    <div style="font-size: 16px" @click="retrieveFeedback">
                        <button class="btn text-light px-2" style="background-color: #cc4d26">
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                </div>

            </div>
            <div class="col-8">
                        <p class="title-page" style="">Danh sách tài khoản</p>
                    </div>

        </div>

        <div>
            <div class="  mt-4 d-flex justify-content-center w-100">

                <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0,0,0,0.25);">
                    <thead class="">
                        <tr style="color: #CC4D26;">
                            <th>STT</th>
                            <th>Khách hàng</th>
                            <th>Gmail</th>
                            <th>Dịch vụ</th>
                            <th>Feedback</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">

                        <tr v-for="(feedback, index) in this.listFeedback">
                            <td>{{ index +1 }}</td>
                            <td>{{ feedback.TenKhachHang }}</td>
                            <td>{{ feedback.Gmail }}</td>
                            <td>{{ feedback.TenLoaiDichVu }}</td>
                            <td>{{ feedback.info.TrangThaiDichVu }}</td>
                            <td>{{ feedback.PhanHoi }}</td>
                            <td></td>

                           
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>

    </div>
</main>
</template>

<style scoped>
.style-button{
    background-color: #CC4D26;
    color: white;
}
.style-button-add{
    background-color: #153A64;
    color: white;

}
.title-page{
    font-size: 30px; 
    font-weight:500; 
    color: #153A64;
}
</style>
