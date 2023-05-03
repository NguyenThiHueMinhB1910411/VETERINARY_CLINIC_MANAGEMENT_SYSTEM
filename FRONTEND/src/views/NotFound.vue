<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue"
export default {
  components: {
    PublicFooters,
    HeaderPublic
  },
};
</script>

<template>
  <HeaderPublic/>
  <div >
    <p>
      Oops, không thể tìm thấy trang. Trở về
      <router-link to="/" class="text-danger">Trang chủ</router-link>
    </p>
  </div>
  <PublicFooters/>
</template>

<style scoped>
p {
  font-size: 50px;
  text-align: center;
  margin:40px 0px ;
}
</style>
