<script>
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
    faSyringe,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faSyringe,
    faComment,
);
</script>

<template>
<div class="col-3  text-light text-light  bg" style="font-size: 18px;font-family: Sans-serif;">
   
    <div class="pt-4 ms-5">
        <a class="" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
            <h4 class="title-name text-uppercase text-center d-flex justify-content-center  px-3 style_title" style=" width: 50%;   font-weight: 700;">ADMIN</h4>
        </a>
    </div>
    <hr class="text-dark">
  
    <div class=" ms-4 pb-4">
        <router-link :to="{ name: 'AccountManager' }">
        <font-awesome-icon icon="fa-solid fa-users" class="px-2" />
        Quản lý tài khoản</router-link
      >
        

    </div>


    <div class=" ms-4 pb-4">
        <router-link :to="{ name: 'HRM' }">
        <font-awesome-icon icon="fa-solid fa-users" class="px-2" />
        Quản lý nhân sự</router-link
      >
    </div>

    <div class=" ms-4 pb-4">
        <router-link :to="{ name: 'MedicalSupplies' }">
        <font-awesome-icon icon="fa-solid fa-solid fa-syringe" class="px-2" />
        Quản lý vật tư y tế</router-link
      >

      
        

    </div>
    <div class=" ms-4 pb-4">
        <router-link :to="{ name:'Feedback' }">
        <font-awesome-icon icon="fa-solid fa-comment" class="px-2" />
        Quản feedback</router-link
      >
        

    </div>

    <hr class="text-dark">
    <div class=" ms-4">
        <a class="" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
            <font-awesome-icon icon="fa-solid fa-gear" class="px-2" />
            Cài đặt
        </a>
    </div>
</div>
</template>

<style>

a{
  color: rgb(6, 20, 53);
  text-decoration: none;
}

.navbar {
    font-size: 25px;
    position: sticky;
    top: 0;
}

.title-name{
  letter-spacing: 0.1cm;
}
.bg{
  background-color: #e2e0fd;

 
}
</style>