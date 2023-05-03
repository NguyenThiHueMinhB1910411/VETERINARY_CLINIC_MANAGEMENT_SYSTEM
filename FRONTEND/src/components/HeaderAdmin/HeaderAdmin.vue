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
    faGear,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faMoneyBill,
    faCreditCard,
    faPrint,
    faUser,
    faGear,
    faMagnifyingGlass
);
import {
    userAccStore
} from "@/Store/userStore";
export default {
    setup() {
        const account = userAccStore();
        return {
            account,
        };
    },
    methods: {
        logout() {
            this.account.user = {};
            this.$router.push({
                name: "Login",
            });
        },
    },
};
</script>
<template>
<header style="border-bottom: 1px #e1deff solid; padding-bottom: 25px">
    <div>
        <div class="row m-0" style="padding-top: 25px">
            <div class="col-9 pl-4">
                <span class=" title-navbar pl-5">VETERINARY CLINIC</span>
            </div>
            <div class="row  col-3 d-flex justify-content-end pe-6 pt-6">
                <div class="col justify-content-end ms-5">
                    <div v-if="account.user.TenAccount == null" class="col">
                        <div class="justify-content-end  title-before-login">
                            <router-link class="nav-link " :to="{ name: 'Login' }">Đăng nhập</router-link>
                        </div>
                    </div>
                    <div v-else class="user-login">
                        <div class="row">
                          
                            <div>
                                <span class=" name-login "> {{ account.user.TenAccount}}</span>
                             
                             <a class="logout-style" @click="logout()">
                                 <font-awesome-icon icon="fa-solid fa-right-from-bracket" style="cursor: pointer" /> 
                             </a>

                            </div>
              
                               

                               
                            
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row m-0">
                        <a class="user-icon"><i class="fas fa-user text-dark"></i></a>
                        <span class=""><a><i class="fa-solid fa-right-from-bracket text-danger" style="cursor: pointer"></i></a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
</template>

<style scoped>
@import "./HeaderAdmin.module.css";
</style>
