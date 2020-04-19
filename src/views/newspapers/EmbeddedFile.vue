<template>
  <embed :src="file" type="application/pdf;base64" style="width: 0; min-width: 100%  !important;" height=2050px>
</template>

<script>
  // bu sayfayı önceden newspapers.vue ekranından çağırıyorduk
  // ama height ı otomatik ayarlayamadığım için
  // GeneratePdfUtils.openWithPageId(pageId); bu şekilde kullanmaya başladık.
  // height otomatik ayarlanır hale gelir ve undownload özelliğini bulursak burası kullanılabilir.
  import NewspaperService from "../../service/NewspaperService";

  export default {
    data(){
      return {
        file: null,
        pageId: this.$route.query.pageId
      }
    },

    methods: {
      async loadFile() {
        let decodedFile = await NewspaperService.getFile(this.pageId);
        this.file = "data:application/pdf;base64, "+ encodeURI(decodedFile);
      }
    },
    beforeMount() {
      this.loadFile();
    }
  }
</script>
<style>
  img {
    max-width: 100%;
  }
  .mycontent-left {
    border-right: 1px dashed #333;
  }
</style>
