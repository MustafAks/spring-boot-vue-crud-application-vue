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
              <ValidationProvider name="pageNumber" rules="required">
                <b-form-group slot-scope="{ valid, errors }">
              <b-form-input v-model="page.pageNumber" type = 'number' :state='errors[0] ? false : (valid ? true : null)' :min="0"  ></b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <label>Dosya Ekle:</label>
            </b-col>
            <b-col sm="7">
              <ValidationProvider name="file" rules="required">
                <b-form-group
                        slot-scope="{ valid, errors }">
              <b-form-file v-model="page.file" class="mt-3" plain :state="errors[0] ? false : (valid ? true : null)"></b-form-file>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-container class="bv-example-row">
            <b-row align-h="end">
              <b-col cols="3">
                <b-button class="w-75" variant="primary" v-on:click.prevent="createPage">Kaydet</b-button>
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
  import GeneratePdfUtils from "../../utils/GeneratePdfUtils";
  import { ValidationProvider } from 'vee-validate';
  export default {
    components: {
      ValidationProvider
    },
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
        const pageNo = this.page.pageNumber;
        const newspaperId = this.newspaper.id;

          if (pageNo === undefined || pageNo === null) {
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
        formData.append('pageNo',pageNo);
        formData.append('newspaperId',newspaperId);
        await NewspaperService.savePage(formData);
        this.$notification(this, 'Sayfa başarılı bir şekilde kayıt edildi.');
        this.loadPages(this.newspaper.id);
      },

      async loadPages(newspaperId) {
        this.pagesItems = await NewspaperService.getPages(newspaperId);
      },

      async previewPage(pageId) {
        await GeneratePdfUtils.openWithPageId(pageId);
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
  form {
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
  }
  .form-group > label {
    font-weight: 600;
  }
</style>
