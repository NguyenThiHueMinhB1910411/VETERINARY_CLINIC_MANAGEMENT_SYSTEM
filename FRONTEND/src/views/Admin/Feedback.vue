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
    faHeart,
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
    faHeart,
);

export default {
    data() {
        return {
            listFeedback: [],
            data: {},
        }
    },
    methods: {
        async handleSubmit(data) {
            
            await FeedbackService.update(data);
            this.retrieveFeedback();
            
        },

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
<main>
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
            <!-- <div class="col-8">
                <p class="title-page" style="">Phản hồi</p>
            </div> -->

        </div>

        <div>
            <div class="row  mt-4 d-flex justify-content-center w-100">

                <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 800%; ">
                    <thead class="">
                        <tr style="color: #CC4D26;">
                            <th>STT</th>
                            <th>Khách hàng</th>
                            <th>SĐT</th>
                            <!-- <th>Gmail</th> -->
                            <th>Vật nuôi</th>
                            <th>Dịch vụ</th>
                            <th>Nội dung</th>
                            <th>Phản hồi</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">

                        <tr v-for="(feedback, index) in this.listFeedback">
                            <td>{{ index +1 }}</td>
                            <td>{{ feedback.info.TenKhachHang }}</td>
                            <td>{{ feedback.info.SoDienThoai }}</td>
                            <!-- <td>{{ feedback.Gmail }}</td> -->
                            <td>{{ feedback.info.UsernameVatNuoi }}</td>
                            <td>{{ feedback.info.TenLoaiDichVu }}</td>
                            <td>{{ feedback.NoiDung }}</td>
                            <td>{{ feedback.TrangThai }}</td>
                            <td>
                                <a 
                                :class="` col-6 ${feedback.TrangThai== 'Đã phản hồi'?'disable':'active'}` "
                        
                  @click="handleSubmit({
                      ...feedback,
                      TrangThai: 'Đã phản hồi',
                    })
                  "
                                >
                                    <font-awesome-icon icon="fa-solid fa-heart " />

                                </a>
                               

                                <!-- <button
                        type="button"
                        :class="`text-light ${registrationInformation.TrangThaiKhamBenh== 'Đã khám'?'disable':'active'}` "

                        :disabled="registrationInformation.TrangThaiKhamBenh== 'Đã khám'"
                        @click="
                          handleStatus({
                            ...registrationInformation,
                            TrangThaiKhamBenh: 'Đã khám',
                          })
                        "
                      >
                        Kê đơn thuốc
                      </button> -->

                            </td>

                        </tr>

                    </tbody>
                </table>

            </div>
        </div>

    </div>
</main>
</template>

<style scoped>
.style-button {
    background-color: #CC4D26;
    color: white;
}

.style-button-add {
    background-color: #153A64;
    color: white;

}

.title-page {
    font-size: 30px;
    font-weight: 500;
    color: #153A64;
}

.active {
    color: #000;
}

.disable {
    color: rgb(153, 6, 6);
   
}
</style>
