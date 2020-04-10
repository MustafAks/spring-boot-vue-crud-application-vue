<template>
  <div class="container">
    <div class="center">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h3>{{ newspaper.issue}} sayı numaralı gazete ({{ newspaper.year}})</h3>
          <h3>Sayfa Ekle</h3>
          <b-row>
            <b-col sm="4">
              <label>Sayfa No:</label>
            </b-col>
            <b-col sm="7">
              <b-form-input v-model="page.pageNumber" type = 'number' :min="0"></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="4">
              <label>Dosya Ekle:</label>
            </b-col>
            <b-col sm="7">
              <b-form-file v-model="page.file" class="mt-3" plain></b-form-file>
            </b-col>
          </b-row>

          <b-container class="bv-example-row">
            <b-row align-h="end">
              <b-col cols="3">
                <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="createPage">Kaydet</b-button>
              </b-col>
            </b-row>
          </b-container>

          <b-col >
            <div class="container">
              <h3>Sayfalar</h3>
              <div class="container">
                <div>
                  <b-table :fields="pagesFields" :items="pagesItems">
                    <template v-slot:cell(file)="row">
                      <b-row>
                        <b-button variant="success" v-on:click.prevent="previewPage(row.item.id)">Sayfa Önizleme</b-button>
                      </b-row>
                    </template>

                      <template v-slot:cell(operations)="row">
                      <b-row>
                        <b-button variant="danger" v-on:click.prevent="deletePage(row.item.id)">Sayfa Sil</b-button>
                      </b-row>
                    </template>
                  </b-table>
                </div>
                <div>
                </div>
              </div>
            </div>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
  </div>
</template>

<script>
  import NewspaperService from "../../service/NewspaperService";
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        newspaper: {
          id: this.$route.params.id,
          title: this.$route.params.title,
          issue: this.$route.params.issue,
          year: this.$route.params.year
        },
        page: {
          pageNumber: '',
          file: null,
          newspapers: this.newspaper
        },
        pagesItems: [],
        pagesFields: [
          { key: 'pageNumber', label: 'Sayfa No' },
          { key: 'file', label: 'Dosya' },
          {key:'operations',label:'İşlemler'}
        ]
      }
    },

    methods: {
      async createPage() {
        let formData = new FormData();
        formData.append('file', this.page.file);
        formData.append('pageNumber',this.page.pageNumber);
        formData.append('newspaperId',this.newspaper.id);

        await NewspaperService.savePage(formData);
        this.$notification(this, 'Sayfa başarılı bir şekilde kayıt edildi.');
        this.loadPages(this.newspaper.id);
      },

      async loadPages(newspaperId) {
        this.pagesItems = await NewspaperService.getPages(newspaperId);
      },

      async previewPage(pageId) {
        const data = await NewspaperService.getFile(pageId);
        var arrayBuffer = this.base64ToArrayBuffer(data); //data is the base64 encoded string
        var blob = new Blob([arrayBuffer], {type: "application/pdf"});
        var link = window.URL.createObjectURL(blob);
        // window.open(link,'', 'height=650,width=840');
        window.open(link);
      },

      base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        return bytes;
      },
      async deletePage(pageId) {
        await NewspaperService.deletePage(pageId);
        this.$notification(this, 'Sayfa başarılı bir şekilde silindi.');
        this.loadPages(this.newspaper.id);
      },
    },
    beforeMount() {
      if (this.newspaper.id === undefined || this.newspaper.id === null) {
        this.$router.push({ name: 'AddNewspaper'});
      }
      this.loadPages(this.newspaper.id);
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
