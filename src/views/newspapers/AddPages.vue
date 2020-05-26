<template>
  <div class="container">
    <div class="center">
      <b-form @submit="createPage" @reset="clear">
        <b-form-group
                id="input-group-1"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Sayfa No :"
                label-for="pageNumber"
        >
          <b-form-input
                  id="pageNumber"
                  v-model="page.pageNumber"
                  required
                  :min="0"
                  type = 'number'
          ></b-form-input>
        </b-form-group>
        <b-form-group
                id="input-group-2"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Dosya Ekle :"
                label-for="file"
        >
          <b-form-file id="file"
                        v-model="page.file"
                       class="mt-3"
                        plain
                       required
          >
          </b-form-file>
        </b-form-group>
        <b-row align-h="end">
          <b-button type="submit" variant="success">
            Ekle
          </b-button>
          <b-button type="reset" variant="primary" style="margin-left: 5px">Temizle</b-button>
        </b-row>
      </b-form>
    </div>
    <h3 align="center" style="margin-top: 50px">Sayfalar</h3>
    <div class="container" style="text-align: center">
      <b-table :fields="pagesFields" :items="pagesItems">
        <template v-slot:cell(file)="row">
          <b-button variant="success" v-on:click.prevent="previewPage(row.item.id)">
            <b-icon icon="eye"></b-icon>
            Önizleme
          </b-button>
        </template>

        <template v-slot:cell(operations)="row">
          <b-button style="margin-left: 5px" variant="danger"
                    v-on:click.prevent="deletePage(row.item.id)">
            <b-icon icon="trash-fill"></b-icon>
            Sil
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
  import NewspaperService from "../../service/NewspaperService";
  import GeneratePdfUtils from "../../utils/GeneratePdfUtils";
  export default {
    data(){
      return {
        newspaper: {
          id: this.$route.params.id,
          title: this.$route.params.title,
          issue: this.$route.params.issue,
          year: this.$route.params.year
        },
        page: {
          pageNumber: null,
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
        const fileFromPage = this.page.file;
        const pageNumber = this.page.pageNumber;
        const newspaperId = this.newspaper.id;

        if (pageNumber === undefined || pageNumber === null || pageNumber==='') {
            this.$errorNotification(this, 'Lütfen sayfa numarası giriniz !');
            return;
        }
        if (fileFromPage === undefined || fileFromPage === null) {
          this.$errorNotification(this, 'Lütfen bir dosya seçiniz !');
          return;
        }
        if (newspaperId === undefined || newspaperId === null) {
          this.$errorNotification(this, 'Gazete bulunamadı !');
          return;
        }

        formData.append('file', fileFromPage);
        formData.append('pageNumber',pageNumber);
        formData.append('newspaperId',newspaperId);
        await NewspaperService.savePage(formData);
        this.$notification(this, 'Sayfa başarılı bir şekilde kayıt edildi.');
        this.clear();
        this.loadPages(this.newspaper.id);
      },

      async loadPages(newspaperId) {
        this.pagesItems = await NewspaperService.getPagesByNewspaperId(newspaperId, 'Desc');
      },

      async previewPage(pageId) {
        await GeneratePdfUtils.openWithPageId(pageId);
      },
      async deletePage(pageId) {
        await NewspaperService.deletePage(pageId);
        this.$notification(this, 'Sayfa başarılı bir şekilde silindi.');
        this.loadPages(this.newspaper.id);
      },
      clear() {
        // Reset our form values
        this.page.id = '';
        this.page.pageNumber = '';
        this.page.file = null;
        this.page.newspapers = '';
      }
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
</style>
