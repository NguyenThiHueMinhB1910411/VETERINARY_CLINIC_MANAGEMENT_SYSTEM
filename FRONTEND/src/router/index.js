import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/HomeView.vue";
import Contact from "@/views/Contact/Contact.vue";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Login/Register.vue";
import About from "@/views/About/About.vue";
import FeverInDog from "@/views/About/FeverInDog.vue";
import StressCat from "@/views/About/StressCat.vue";

// import Booking from '@/views/Booking/Booking.vue';
import Service from '@/views/Service/Service.vue';
import SpaRoom from '@/views/Service/SpaRoom/SpaRoom.vue';
import HotelRoom from '@/views/Service/HotelRoom/HotelRoom.vue';
import PhysicalExamination from '@/views/Service/PhysicalExamination/PhysicalExamination.vue';
// admin
import Admin from '@/views/Admin/Admin.vue';

import Staff from '@/views/Staff/Staff.vue';

//DOCTOR

import Doctor from '@/views/Doctor/Doctor.vue';




const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  { path: "/about", name: "About", component: About },
  {
    path: "/feverInDog",
    name: "FeverInDog",
    component: FeverInDog,
  },
  // stress cat
  {
    path: "/stressCat ",
    name: "StressCat",
    component: StressCat,
  },
  // {
  //   path:'/booking',
  //   name:'Booking',
  //   component: Booking,
  // },
  {
    path: '/Service',
    name: 'Service',
    component: Service,
  },
  {
    path: '/HotelRoom',
    name: 'HotelRoom',
    component: HotelRoom,
  },
  {
    path: '/SpaRoom',
    name: 'SpaRoom',
    component: SpaRoom,
  },
  {
    path: '/PhysicalExamination',
    name: 'PhysicalExamination',
    component: PhysicalExamination,
  },



  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    children : [
     {
      path: 'dashboard',
      name: 'DashBoard',
      component: () => import("@/views/Admin/DashBoard.vue"),
     },
     {
      path: 'hrm',
      name: 'HRM',
      component: () => import("@/views/Admin/HRM.vue"),
     },
     {
      path: 'addPerson',
      name: 'AddPerson',
      component: () => import("@/views/Admin/AddPerson.vue"),
     },
     {
      path: 'accountManager',
      name: 'AccountManager',
      component: () => import("@/views/Admin/AccountManager.vue"),
     },
     {
      path: 'InfoDoctor/:id',
      name: 'InfoDoctor',
      component: () => import("@/views/Admin/InfoDoctor.vue"),
     },
     {
      path: 'Feedback',
      name: 'Feedback',
      component: () => import("@/views/Admin/Feedback.vue"),
     },
     {
      path: 'MedicalSupplies',
      name: 'MedicalSupplies',
      component: () => import("@/views/Admin/MedicalSupplies.vue"),
     },
     
     {
      path: 'ex',
      name: 'ex',
      component: () => import("@/views/Admin/ex.vue"),
     }

     
    ]
  },

  //STAFF
  {
    path: '/staff',
    name: 'Staff',
    component: Staff,
    children : [
      //trang xem các lịch trình đã khám
      //trang xác nhận 
     {
      path: 'Examinated',
      name: 'Examinated',
      component: () => import("@/views/Staff/Examinated.vue"),
     },
     //Trang lịch trình bác sĩ
     {
      path: 'DoctorCalendar',
      name: 'DoctorCalenadar',
      component: () => import("@/views/Staff/DoctorCalendar.vue"),
     },
     {
      path: '/Confirm',
      name: 'Confirm',
      component: () => import("@/views/Staff/Confirm.vue"),
     },
     //Trang ds bác sĩ
     {
      path: 'ListDoctors',
      name: 'ListDoctors',
      component: () => import("@/views/Staff/ListDoctors.vue"),
     },
     //Nhân viên xem các lịch đã được book trực tuyến
     {
      path: 'Booked',
      name: 'Booked',
      component: () => import("@/views/Staff/Booked.vue"),
     },
     //các dịch vụ khác
     {
      path: 'OtherBooked',
      name: 'OtherBooked',
      component: () => import("@/views/Staff/Other/OtherBooked.vue"),
     },
     {
      path: 'InfoBooked/:id',
      name: 'InfoBooked',
      component: () => import("@/views/Staff/Other/InfoBooked.vue"),
     },
      
       

     //Dịch vụ khám bệnh
     {
      path: 'ExaminationDoctor',
      name: 'ExaminationDoctor',
      component: () => import("@/views/Staff/Examinated/Examination(Doctor).vue"),
     },
     {
      path: 'InfoExaminated/:id',
      name: 'InfoExaminated',
      component: () => import("@/views/Staff/Examinated/InfoExaminated.vue"),
     },
     //
     {
      path: 'PreDetail/:id',
      name: 'PreDetail',
      component: () => import("@/views/Staff/Examinated/PreDetail.vue"),
     },
     {
      path: 'InfoMedicalRecord/:id/:UsernameVatNuoi',
      name: 'InfoMedicalRecord',
      component: () => import("@/views/Staff/Examinated/InfoMedicalRecord.vue"),
     },
     {
      path: 'MedicalRecord',
      name: 'MedicalRecord',
      component: () => import("@/views/Staff/Examinated/MedicalRecord.vue"),
     },

    

    
    ]
  },

  ///DOCTOR
  {
    path: '/doctor',
    name: 'Doctor',
    component: Doctor,
    children : [
     //Trang lịch trình bác sĩ
     {
      path: 'SelfCalenadar',
      name: 'SelfCalenadar',
      component: () => import("@/views/Doctor/SelfCalenadar.vue"),
     },
     {
      path: 'Prescriptions',
      name: 'Prescriptions',
      component: () => import("@/views/Doctor/Prescriptions.vue"),
     },
     {
      path: 'DetailsPrescription',
      name: 'DetailsPrescription',
      component: () => import("@/views/Doctor/DetailsPrescription.vue"),
     },
     
     
     
     {
      path: 'AddMedical/:id',
      name: 'AddMedical',
      component: () => import ("@/views/Doctor/AddMedical.vue"),
      params : true
     },
     {
      path: 'EditMedical/:id',
      name: 'EditMedical',
      component: () => import ("@/views/Doctor/EditMedical.vue"),
      params : true
     },
     {
      path: 'MedicalRe',
      name: 'MedicalRe',
      component: () => import("@/views/doctor/MedicalRe.vue"),
     },
     {
      path: 'InfoMe/:id/:UsernameVatNuoi',
      name: 'InfoMe',
      component: () => import("@/views/doctor/InfoMe.vue"),
     },


     {
      path: 'PreDetailDoctor/:id',
      name: 'PreDetailDoctor',
      component: () => import("@/views/Doctor/PreDetail.vue"),
     },
     {
      path: 'InfoExaminatedDoctor/:id',
      name: 'InfoExaminatedDoctor',
      component: () => import("@/views/Doctor/InfoExaminated.vue"),
     },
    
    ]
  },





  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
