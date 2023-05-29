<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue";
import accountService from "../../services/account.service";
export default {
    components: {
        PublicFooters,
        HeaderPublic,
        accountService,
    },
    data() {
        return {
            data: {},
            account: [],

        }
    },
    methods: {
    
        async handleSubmit() {

            const rs = await accountService.register(this.data);

        },
    },

    // created() {
    //     this.retrieveService();
    // },

};
</script>
<template>
<HeaderPublic />


<div class="container">
    <div>
        <div class="row">
            <div class="col-6 p-5 frame-image">
                <img src="../../assets/images/service-health.jpg" class="img-fluid" alt="" />
            </div>

            <div class="col-6">
                <div class="row justify-content-center border-dark">
                    <div class="rounded frame-login col-9">
                        <h2 class="text-center login-title">Đăng ký</h2>
                        <div class="justify-content-center">
                            <div class="form-group">
                                <label for=" " class="">Tên Tài khoản:</label>
                                <input type="text" class="form-control" id="TenKhachHang " placeholder="Nhập vào tên tài khoản " v-model="this.data.TenAccount" required />
                            </div>
                            <div class="form-group">
                                <label for="email " class="">Địa chỉ email:</label>
                                <input type="email" class="form-control" id="gmail " placeholder="Nhập vào địa chỉ email " required v-model="this.data.Gmail" />
                            </div>
                            <div class="form-group">
                                <label for="phone " class="">Số điện thoại:</label>
                                <input type="email" class="form-control" id="gmail " placeholder="Nhập vào số điện thoại " required v-model="this.data.SoDienThoai" />
                            </div>
                            <div class="form-group">
                                <label for="pwd">Mật khẩu:</label>
                                <input type="password" class="form-control" id="pwd" placeholder="Nhập vào mật khẩu!" required v-model="this.data.Password" />
                            </div>
                            
                            <div class="checkbox">
                                <label><input type="checkbox" class="fw-bolder remember" /> Nhớ
                                    tài khoản này</label>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary text-light btn-submit border border-white" data-bs-toggle="modal" data-bs-target="#exampleModal"  @click="handleSubmit">
                                    Đăng ký
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Thông báo</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div>
                                                    Bạn đã đăng ký tài khoản thành công !
                                                </div>
                                                
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary"  data-bs-dismiss="modal">Đóng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <router-link class="nav-link text-dark pb-2" :to="{ name: 'Login' }">
                                    <span class="account text-dark fw-bold">
                                        Đã có tài khoản?
                                    </span>
                                </router-link>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<PublicFooters />
</template>

<style scoped>
body {
    font-family: "Poppings", sans-serif !important;
}

label {
    font-weight: 700;
    font-size: larger;
    font-family: serif;
}

h2 {
    font-weight: 700;
    font-family: serif;
}

.btn-submit {
    margin: 5% 10%;
}

.btn-submit:hover {
    background-color: rgb(116, 171, 235);
}

.btn-submit:active {
    background-color: rgb(47, 125, 214);
}

.container-form {
    padding: 3% 5% 3% 5%;
    background-color: #f2f2f2;
}

.container {
    padding-top: 5%;
    padding-bottom: 3%;
}

.login-title {
    padding-top: 5%;
}

.form-group {
    margin-top: 20px;
}

.account {
    text-decoration: underline;
}

.remember {
    margin-top: 20px;
}
</style>
