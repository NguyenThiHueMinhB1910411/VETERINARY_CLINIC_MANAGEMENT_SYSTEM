<script>
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin.vue";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.vue";
export default {
    components: {
        SidebarAdmin,
        HeaderAdmin,

    },
};
</script>
<template>
    <div class="row">

        <SidebarAdmin class="col" />
        <div class="col">
            <HeaderAdmin class="row" />
            <router-view class="row " style="background-color: #f3f6f4;padding-bottom: 20%;"></router-view>

        </div>

    </div>
</template>

