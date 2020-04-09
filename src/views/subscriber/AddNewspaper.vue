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
                <b-form-input v-model="newspaper.title"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Sayı:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="newspaper.issue" type = 'number' :min="1"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Yıl:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="newspaper.year" type = 'number' :min="2010"></b-form-input>
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
  export default {
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
        this.newspaper = await NewspaperService.saveNewspaper(this.newspaper);
        this.$notification(this, 'Gazete başarılı bir şekilde kayıt edildi.');
        // if success
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
  .mycontent-left {
    border-right: 1px dashed #333;
  }
</style>
