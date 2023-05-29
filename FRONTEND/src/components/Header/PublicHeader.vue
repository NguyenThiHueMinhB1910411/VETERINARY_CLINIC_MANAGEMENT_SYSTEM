<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faUser, faRightFromBracket);

import { userAccStore } from "@/Store/userStore";

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
  <header>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <img
            src="https://www.purina.com/sites/default/files/new-logo1.png"
            alt="Logo"
            class="mt-5 w-50 d-block"
          />
        </div>
        <div class="col-6 d-flex flex-column">
          <div class="d-flex flex-row mt-4">
            <input type="text" placeholder="Tìm kiếm" />
            <button>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              Tìm kiếm
            </button>
          </div>

          <nav class="mt-4">
            <router-link :to="{ name: 'Home' }">Trang chủ</router-link>
            <router-link :to="{ name: 'About' }">Về chúng tôi</router-link>
            <router-link :to="{ name: 'Service' }">Dịch vụ</router-link>
            <router-link :to="{ name: 'Contact' }">Liên hệ</router-link>
            <router-link :to="{ name: 'Service' }">Đặt lịch</router-link>
          </nav>
        </div>

        <div class="col-3">
          <div>
            <div class="d-flex flex-row justify-content-between">
              

              <div>
                <div>
                  <router-link :to="{ name: 'Register' }">
                    <p
                      class=" text-center rounded-2 fw-bold py-1"
                      style="margin-top: 30px; color: white"
                    >
                       Đăng ký
                    </p>
                  </router-link>
                </div>
              </div>
              <div v-if="account.user.TenAccount == null" class="col">
                <div>
                  <router-link :to="{ name: 'Login' }">
                    <p
                      class="me-2 px-1 text-center rounded-2 text-white fw-bold py-1 "
                      style="margin-top: 30px"
                    >
                    <span style="padding-right: 10px;">|</span>
                      Đăng nhập
                     
                    </p>
                    
                  </router-link>
                </div>
              </div>
              <div v-else class="user-login" style="padding-top: 35px">
                <span class="text-light " style="padding-right: 20px;">|</span>
                
                <span
                  class=" text-center rounded-2 text-white fw-bold py-1 w-100"
                  >{{ account.user.TenAccount }}
                  <a @click="logout()">
                    
                    <font-awesome-icon
                      icon="fa-solid fa-right-from-bracket"
                      class="text-danger px-3"
                      style="cursor: pointer"
                    /> </a
                ></span>
              </div>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-end mt-3">
                    <img style="width: 30px" class="d-block me-2" alt="VN" src="data:image/png;base64,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" />
                    <img style="width: 30px" class="d-block" alt="EN" src=" https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png" />
                </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>

header {
  background-color: #084d7b;
  height: 150px;
}

header input {
  height: 45px;
  outline: none;
  border: none;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  width: 70%;
  padding-left: 10px;
}

header button {
  color: white;
  font-weight: bold;
  background-color: #000000;
  height: 45px;
  border: none;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0px 20px;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding-bottom: 20px;
}

nav a:hover {
  border-bottom: 5px solid white;
}

a {
  text-decoration: none;
  color: white;
}
</style>
