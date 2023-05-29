
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
    faCalendarDays,
    faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faCalendarDays,
    faPrescriptionBottleMedical,
);
</script>

<template>
<div class="col-3 bg-color-sidebars text-light bg" style="font-size: 18px;font-family: Sans-serif; border-right: 1px #E1DEFF solid;">
   
    <div class="pt-4 ms-5">
        <a class="" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">

            <h4 class="title-name text-uppercase text-center d-flex justify-content-center  px-3 style_title" style=" width: 50%;   font-weight: 700;">DOCTOR</h4>
        </a>
    </div>
    <hr class="text-dark">
  

    <div class=" ms-4 pb-4 decorate">
        <router-link :to="{ name: 'SelfCalenadar' }">
        <font-awesome-icon icon="fa-solid fa-calendar-days" class="px-2" />
        Quản lý lịch khám</router-link
      >
        

    </div>
    <div class=" ms-4 pb-4 decorate">
        <router-link :to="{ name: 'Prescriptions' }">
        <font-awesome-icon icon="fa-solid fa-prescription-bottle-medical" class="px-2" />
    Danh sách kê đơn</router-link
      >
        

    </div>
    <div class=" ms-4 pb-4 decorate">
        <router-link :to="{ name: 'MedicalRe' }">
        <font-awesome-icon icon="fa-solid fa-prescription-bottle-medical" class="px-2" />
    Quản lý hồ sơ</router-link
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
@import"./SidebarDoctor.module.css";


</style>

