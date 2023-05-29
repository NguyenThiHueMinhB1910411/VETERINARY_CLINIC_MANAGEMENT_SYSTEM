<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue";
import CategoryService from "../../services/categoryService.service";
export default {
    components: {
        PublicFooters,
        HeaderPublic
    },

    data() {
        return {
            ListCategoryService: [ ],
            filtered:[],
        }
    },
    methods: {
        async retrieveCategoryService() {
            try {
                this.ListCategoryService = await CategoryService.getAll();
                //this.ListCategoryService = this.ListCategoryService.filter((e) => e.MaLoaiDichVu == "DV2")
                // console.log(this.ListCategoryService)
            } catch (error) {
                console.log(error);
            }
        },
        filteredService(filter) {
            this.filtered = this.ListCategoryService.filter(e => e.MaLoaiDichVu == filter)
        },
    },
    mounted() {
        this.retrieveCategoryService();
    },

    
};
</script>
<template>
<HeaderPublic />

<main class="" style="padding-bottom: 100px;">
    <p class="title text-center mt-0 w-100" style="background-color: black; font-size: 40px">
        Dịch vụ
    </p>

    <div>
        <div class="hotel-room row px-5 " style="padding-top:100px;"  v-for="(CategoryService, index) in this.ListCategoryService">
            <div class="col-6 p-2 border border-dark">
                <img :src="CategoryService.HinhAnh" class="img-fluid" alt="">
            </div>

            <div class="col-6  pt-5 px-5">
            
                <h4 class="text-uppercase " style="font-size: 35px;">{{CategoryService.TenLoaiDichVu }}</h4>
                <div class="pb-4">
                    {{ CategoryService.MoTa }}
                </div>
            

                <router-link :to="{name: CategoryService.ChuyenTrang}" class="text-dark bg-ligh border px-5 py-2 border border-dark bg-light " style="text-decoration: none; font-size: 22px; font-weight: 600;">Xem chi tiết</router-link>
            </div>
           
        </div>
    </div>

</main>
<PublicFooters />
</template>

<style>
@import "./Service.module.css";
</style>
