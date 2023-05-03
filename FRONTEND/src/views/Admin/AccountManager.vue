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
);

export default {
    data() {
        return {
            listAccount: [],
            data: {},
            showPassword: false,
            password: null,
        }
    },
    methods: {
        async getAccount(id) {
            try {
                this.doctor = await AccountService.get(id);

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
        <div class="row">

            <div class="">
                <div class="">

                    <div class="">

                        <div class="text-center">
                            <h3 class=" text-dark text-center pt-4">Danh sách tài khoản
                            </h3>
                        </div>

                        <div class="">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn text-light" style="background-color: #04253b;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Thêm tài khoản
                            </button>
                            <!-- <button type="button" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Thêm nhân viên
                            </button> -->

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content ">
                                        <div class="modal-header">
                                            <h5 class="modal-title text-center" id="exampleModalLabel">
                                                <font-awesome-icon icon="fa-solid fa-user-doctor" /> Thêm bác sĩ</h5>
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

                        <div class="  mt-4 d-flex justify-content-center ">

                            <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0,0,0,0.25);">
                                <thead class="">
                                    <tr class="" style="color: #063555;">
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
                                            <td> <p  v-if="showPassword" >{{ account.Password }}</p></td>
                                            <td class="px-2"> <font-awesome-icon icon="fa-solid fa-eye" @click="toggleShow"/></td>
                                            <!-- <div class="field has-addons">
                                                <div class="control is-expanded">
                                                    <p  v-if="showPassword" >{{ account.Password }}</p>
                                                   
                                                   
                                                </div>
                                                <div>
                                                    <font-awesome-icon icon="fa-solid fa-eye" @click="toggleShow"/>
                                                    

                                                </div>
                                              
                                            </div> -->
                                        </td>
                                        <td>
                                            <font-awesome-icon icon="fa-solid fa-pen" class=" text-warning " />
                                            <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger px-4" @click="handleDeleteAccount(account.TenAccount)" />

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
</style>
