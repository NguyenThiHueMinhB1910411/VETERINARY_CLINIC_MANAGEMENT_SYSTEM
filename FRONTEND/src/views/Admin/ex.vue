<script>
 const app = new Vue({
    data: () => ({images: null}),
   
    methods: {
      uploadFile() {
        this.Images = this.$refs.file.files[0];
      },
      submitFile() {
        const formData = new FormData();
        formData.append('file', this.Images);
        const headers = { 'Content-Type': 'multipart/form-data' };
        axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
        });
      }
    }
  });
  app.$mount("#content");
</script>
<template>
      <div>
        <input type="file" @change="uploadFile" ref="file">
        <button @click="submitFile">Upload!</button>
      </div>
</template>