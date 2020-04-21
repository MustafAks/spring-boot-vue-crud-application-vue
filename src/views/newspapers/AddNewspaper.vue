<template>
  <div class="container">
    <div class="center">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h3>Gazete Ekle</h3>
            <b-row>
              <b-col sm="4">
                <label>Başlık:</label>
              </b-col>
              <b-col sm="7">
                <ValidationProvider name="newspaperTitle" rules="required">
                  <b-form-group slot-scope="{ valid, errors }">
                <b-form-input v-model="newspaper.title" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Sayı:</label>
              </b-col>
              <b-col sm="7">
                <ValidationProvider name="newspaperTitle" rules="required">
                  <b-form-group slot-scope="{ valid, errors }">
                <b-form-input v-model="newspaper.issue" type = 'number' :min="1" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Yıl:</label>
              </b-col>
              <b-col sm="7">
                <ValidationProvider name="newspaperTitle" rules="required">
                  <b-form-group slot-scope="{ valid, errors }">
                <b-form-input v-model="newspaper.year" type = 'number' :min="2010"  :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
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
                  <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="createNewspaper">Kaydet</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="container">
            <h3>Gazeteler</h3>
            <div class="container">
              <div>
                <b-table :fields="newspapersFields" :items="newspapersItems">
                  <template v-slot:cell(operation)="row">
                    <b-row>
                      <b-button variant="success" v-on:click.prevent="redirectPages(row.item)">Sayfa Ekle/Çıkar</b-button>
                      <b-button variant="danger"  v-on:click.prevent="deleteNewspaper(row.item.id)">Sil</b-button>
                    </b-row>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import NewspaperService from "../../service/NewspaperService";
  import {ValidationProvider} from "vee-validate";
  export default {
    components: {
      ValidationProvider
    },
    data(){
      return {
        newspaper: {
          title: '',
          issue: '',
          year: '',
        },
        newspapers: [],
        newspapersItems: [],
        newspapersFields: [
          { key: 'title', label: 'Başlık' },
          { key: 'issue', label: 'Sayı' },
          { key: 'year', label: 'Yıl' },
          { key: 'operation', label: 'İşlemler' }
        ]
      }
    },

    methods: {
      async createNewspaper() {
        if(this.newspaper.title===undefined || this.newspaper.title===null || this.newspaper.title===''){
          this.$errorNotification(this, 'Lütfen gazete başlığı giriniz !');
          return ;
        }
        if(this.newspaper.issue===undefined || this.newspaper.issue===null || this.newspaper.issue===''){
          this.$errorNotification(this, 'Lütfen sayı değerini giriniz !');
          return ;
        }
        if(this.newspaper.year===undefined || this.newspaper.year===null || this.newspaper.year===''){
          this.$errorNotification(this, 'Lütfen yıl değerini giriniz !');
          return ;
        }
        await NewspaperService.saveNewspaper(this.newspaper);
        this.$notification(this, 'Gazete başarılı bir şekilde kayıt edildi.');
        this.newspaper.id = null;
        this.newspaper.title = null;
        this.newspaper.issue = null;
        this.newspaper.year = null;
        
        this.loadNewspapers();
      },

      async deleteNewspaper(newspaperId) {
        await NewspaperService.deleteNewspaper(newspaperId);
        this.$notification(this, 'Gazete başarılı bir şekilde silindi.');
        // if success
        this.loadNewspapers();
      },

      async loadNewspapers() {
        this.newspapersItems = await NewspaperService.list();
      },

      redirectPages(params) {
        this.$router.push({ name: 'AddPages', params : params});
      },
    },
    beforeMount() {
      this.loadNewspapers();
    }
  }
</script>
<style>
  img {
    max-width: 100%;
  }
</style>
