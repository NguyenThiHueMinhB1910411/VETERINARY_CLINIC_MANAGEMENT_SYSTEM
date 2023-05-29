<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouse,
  faGear,
  faUser,
  faUsers,
  faDog,
  faArrowDown,
  faCalendarCheck,
  faCalendarDay,


  faNotesMedical,
  faCheck,
  faUserDoctor,
  faHospital,
  faFile,
  faCreditCard,
  
} from "@fortawesome/free-solid-svg-icons";
library.add(faHouse, faGear, faUser, faUsers, faDog,faArrowDown,faCalendarCheck, faCalendarDay,faNotesMedical,  faCheck,faUserDoctor, faHospital,faFile,faCreditCard,)
</script>

<template >
  <div
    class="col-3  text-light text-light  bg"
    style="font-size: 18px; font-family: Sans-serif,; padding-bottom: 50%;"
  >
    <div class="pt-4 ms-5">
      <a
        class=""
        data-bs-toggle="collapse"
        href="#collapseExample1"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
      <h4 class="title-name text-uppercase text-center d-flex justify-content-center  px-3 style_title" style=" width: 50%;   font-weight: 700;">STAFF</h4>
      </a>
    </div>
    <hr class="text-dark" />
    <div class="ms-4 pb-4 text-light " style="font-weight: 600;">
      <router-link :to="{ name: 'Confirm' }">
        <font-awesome-icon icon="fa-solid fa-check" class="px-2  " />
        <span >
          Quản lý yêu cầu

        </span>
       </router-link
      >
    </div>

    <div class="ms-4 pb-4 text-light" style="font-weight: 600;">
      <router-link :to="{ name: 'DoctorCalenadar' }">
        <font-awesome-icon icon="fa-solid fa-calendar-check" class="px-2 " />
        
        Quản lý lịch bác sĩ</router-link
      >
    </div>
    <div class="ms-4 pb-4 text-light" style="font-weight: 600;">
      <router-link :to="{ name: 'Booked' }">
       
        <font-awesome-icon icon="fa-solid fa-user-doctor" class="px-2" />
        Chọn bác sĩ</router-link
      >
    </div>

    <div class="ms-4 pb-4 text-light" style="font-weight: 600;">
      <router-link :to="{ name: 'OtherBooked' }">
        <font-awesome-icon icon="fa-solid fa-calendar-days" class="px-2" />
        Quản lý dịch vụ</router-link
      >
    </div>
    <div class="ms-4 pb-4 text-light" style="font-weight: 600;">
      <router-link :to="{ name: 'ExaminationDoctor' }">
       
        <font-awesome-icon icon="fa-solid fa-hospital" class="px-2" />
        Quản lý khám bệnh</router-link
      >
    </div>
    <div class="ms-4 pb-4 text-light" style="font-weight: 600;" >
      <router-link :to="{ name: 'MedicalRecord' }">
        <font-awesome-icon icon="fa-solid fa-file"  class="px-2"/>
        Quản lý hồ sơ</router-link
      >
    </div>
  
    <hr class="text-dark" />
    <div class="ms-4 text-dark" style="font-weight: 600;">
      <a
        class=""
        data-bs-toggle="collapse"
        href="#collapseExample1"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <font-awesome-icon icon="fa-solid fa-gear" />
        Cài đặt
      </a>
    </div>
  </div>
</template>
<style scoped>
@import "./SidebarStaff.module.css";
</style>

