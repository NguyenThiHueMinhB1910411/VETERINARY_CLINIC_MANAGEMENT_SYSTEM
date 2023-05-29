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
import feedbackservice from "../../services/feedbackservice";
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
            listFeedback: {},
            Feedback: {},
            data: {},
            feedback: null,
        }
    },
    methods: {
 
        async handleDelete(ngayFeedback) {
            if (window.confirm("Bạn có muốn xóa phản hồi này?")) {
                FeedbackService.delete(ngayFeedback)

            }
            this.retrieveFeedback();
        },
        async handleSubmit(data) {

            await FeedbackService.update(data);
            this.retrieveFeedback();

        },

        async retrieveFeedback() {
            try {
                this.listFeedback = await FeedbackService.getAll();
                this.Feedback = this.listFeedback;
                this.Feedback = this.Feedback.filter((e) => e.info.TrangThaiDichVu == "Hoàn tất");
                this.Feedback = this.Feedback.filter((e) => e.info.ThanhToan == "Đã thanh toán");
                
            } catch (error) {
                console.log(error);
            }
        },
        filtered(filter) {
            this.Feedback = this.listFeedback;
            this.filtered = this.Feedback.filter(e => e.TrangThaiDichVu == filter);
            // this.filtered = this.listFeedback.filter(e => e.ThanhToan == filter);

        },

        filteredThanhToan(filter) {

            this.filtered = this.Feedback.filter(e => e.ThanhToan == filter);

        },
        search(event) {
            this.Feedback = this.listFeedback.filter(
                (e) =>
              
                e.SoDienThoai.includes(event.target.value) ||
                 e.TenKhachHang.toLowerCase().includes(event.target.value.toLowerCase()) ||
                 e.NoiDung.toLowerCase().includes(event.target.value.toLowerCase())

            );
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
            <div class="col-7 ">

                <div class="d-flex">
                    <div style="font-size: 16px" @click="retrieveFeedback">
                        <button class="btn text-light px-2" style="background-color: #cc4d26">
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                </div>

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
                            <th>Thời gian</th>
                            <th>Nội dung</th>
                            <th>Phản hồi</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">

                        <tr v-for="(feedback, index) in this.Feedback">
                            <td>{{ index +1 }}</td>
                            <td>{{ feedback.TenKhachHang }}</td>
                            <td>{{ feedback.info.SoDienThoai }}</td>
                            <!-- <td>{{ feedback.Gmail }}</td> -->
                            <td>{{ feedback.info.UsernameVatNuoi }}</td>

                            <td>{{ feedback.info.TenLoaiDichVu }}</td>
                            <td>{{ feedback.NgayFeedback }}</td>
                            <td>{{ feedback.NoiDung }}</td>
                            <td>{{ feedback.TrangThai }}</td>
                            <td>
                                <a :class="` col-6 ${feedback.TrangThai== 'Đã phản hồi'?'disable':'active'}` " @click="handleSubmit({
                      ...feedback,
                      TrangThai: 'Đã phản hồi',
                    })
                  ">
                                    <font-awesome-icon icon="fa-solid fa-heart " />

                                </a>

                                <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger px-4" @click="handleDelete(feedback.NgayFeedback)" />


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
