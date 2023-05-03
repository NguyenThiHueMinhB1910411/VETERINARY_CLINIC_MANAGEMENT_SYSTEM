<script>
import SidebarStaff from "../../components/SidebarStaff/SidebarStaff.vue";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.vue";
export default {
    components: {
        SidebarStaff,
        HeaderAdmin,
    },
};
</script>

<!-- <template>
<HeaderAdmin/>
<div class="row m-0">
    <SidebarStaff class="col-2" />

    <router-view class="col-9 ">

    </router-view>

</div>
</template> -->

<template>
    <div class="row">

<SidebarStaff class="col" />
<div class="col ">
    <HeaderAdmin class="row" />
    <router-view class="row " style="background-color: #f3f6f4;padding-bottom: 20%;"></router-view>

</div>

</div>
    </template>
