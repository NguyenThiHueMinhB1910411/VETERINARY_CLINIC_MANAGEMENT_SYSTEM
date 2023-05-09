<script>
import AccountService from "../../services/account.service";

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
    faPenToSquare,
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
    faPenToSquare,
);

export default {
    data() {
        return {
            listAccount: [],
            data: {},
            showPassword: false,
            password: null,
            value:{},
            account: null,
        }
    },
    methods: {
        async getAccount(id) {
            try {
                this.account = await AccountService.get(id);

            } catch (error) {
                console.log(error);
            }
        },

        async retrieveAccounts() {
            try {
                this.listAccount = await AccountService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async handleSubmit() {

            const rs = await AccountService.create(this.data);
            this.retrieveAccounts();

        },
        async handleDeleteAccount(tenaccount) {
            if (window.confirm("Bạn có muốn xóa tài khoản này ?")) {
                AccountService.delete(tenaccount)

            }
            this.retrieveAccounts();
        },
        async handleUpdate(id) {
          

            if (window.confirm("Bạn có cập nhật tài khoản này ?")) {
                await AccountService.update(id, this.value);
               
            }
            this.retrieveAccounts();
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        }

    },
    computed: {
        buttonLabel() {
            return (this.showPassword) ? "Hide" : "Show";
        }
    },
    created() {
        // this.getAccount(this.$route.params.id);
        this.retrieveAccounts();
    },
}
</script>
<template>
<main>
    <div>
        <div class="row my-3">
            <div class="col-4 ">

                <div class="d-flex">
                    <div style="font-size: 16px" @click="retrieveAccounts">
                        <button class="btn text-light px-2" style="background-color: #cc4d26">
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                    <button type="button" class="btn text-light mx-2 style-button-add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Thêm 
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content ">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel">
                                        <font-awesome-icon icon="fa-solid fa-user" /> Thêm tài khoản</h5> &nbsp;
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" style="font-size: 16px !important;">
                                    <table>
                                        <tr class="row">
                                            <td class="col-4">
                                                <p>Tên tài khoản: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào tên tài khoản" v-model="this.data.TenAccount" />

                                            </td>

                                            <td class="col-4">
                                                <p>Gmail: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào gmail" v-model="this.data.Gmail" />

                                            </td>
                                            <td class="col-4">
                                                <p>Mật khẩu: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào mật khẩu" v-model="this.data.Password" />

                                            </td>

                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                    <button type="button" class="btn btn-primary" @click="handleSubmit" data-bs-dismiss="modal">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="col-8">
                        <p class="title-page" style="">Danh sách tài khoản</p>
                    </div>

        </div>

        <div>
            <div class="row  mt-4 ">
                <div class="col-1"></div>
                <div class="col-10">
                    <table class="  table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%;box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25); ;">
                    <thead class="">
                        <tr style="color: #CC4D26;">
                            <th scope="col ">STT</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">

                        <tr v-for="(account, index) in this.listAccount">
                            <td scope="row">{{ index + 1 }}</td>
                            <td>{{ account.TenAccount }}</td>
                            <!-- <td>{{ account.Password }}</td> -->
                            <td>
                            <td>
                                <p v-if="showPassword">{{ account.Password }}</p>
                            </td>
                            <td class="px-2">
                                <font-awesome-icon icon="fa-solid fa-eye" @click="toggleShow" />
                            </td>

                            </td>
                            <td>
                                <font-awesome-icon icon="a-solid fa-pen-to-square" class=" text-warning "  data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="this.value = account "/>
                                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content ">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="exampleModalLabel1">
                                        <font-awesome-icon icon="fa-solid fa-user" /> Chỉnh sửa thông tin</h5> &nbsp;
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" style="font-size: 16px !important;">
                                    <table>
                                        <tr class="row">
                                            <td class="col-4">
                                                <p>Tên tài khoản: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào tên tài khoản" v-model="this.value.TenAccount" />

                                            </td>

                                            <td class="col-4">
                                                <p>Gmail: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào gmail" v-model="this.value.Gmail" />

                                            </td>
                                            <td class="col-4">
                                                <p>Mật khẩu: </p>
                                                <input class="col form-control" type="text" placeholder="Nhập vào mật khẩu" v-model="this.value.Password" />

                                            </td>

                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                    <button type="button" class="btn btn-primary" @click="handleUpdate(account._id)" data-bs-dismiss="modal">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                                <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger px-4" @click="handleDeleteAccount(account.TenAccount)" />

                            </td>
                        </tr>

                    </tbody>
                </table>
                </div>
                

                
                <div class="col-1"></div>

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
