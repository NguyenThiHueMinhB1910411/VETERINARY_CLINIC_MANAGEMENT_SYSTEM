<script>
import SidebarDoctor from "../../components/SidebarDoctor/SidebarDoctor.vue";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.vue";
export default {
    components: {
        SidebarDoctor,
        HeaderAdmin,

    },
};
</script>
<!-- 
<template>
<HeaderAdmin />
<div class="row m-0">
    <SidebarDoctor class="col-2" />

    <router-view class="col-9 ">

    </router-view>

</div>
</template> -->

<template>
    <div class="row">

        <SidebarDoctor class="col" />
        <div class="col">
            <HeaderAdmin class="row" />
            <router-view class="row " style="background-color: #f3f6f4;padding-bottom: 20%;"></router-view>

        </div>

    </div>
</template>
