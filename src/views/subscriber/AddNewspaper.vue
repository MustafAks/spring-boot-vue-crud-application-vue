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
                <b-form-input v-model="gazete.baslik"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Sayı:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="gazete.sayi" type = 'number'></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <label>Yıl:</label>
              </b-col>
              <b-col sm="7">
                <b-form-input v-model="gazete.yil" type = 'number'></b-form-input>
              </b-col>
            </b-row>

            <b-container class="bv-example-row">
              <b-row align-h="end">
                <b-col cols="3">
                  <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="createGazete">Kaydet</b-button>
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
                <b-table :fields="gazetelerFields" :items="gazetelerItems">
                  <template v-slot:cell(islemler)="row">
                    <b-row>
                      <b-button variant="success" v-on:click.prevent="redirectSayfalar(row.item)">Sayfa Ekle/Çıkar</b-button>
                      <b-button variant="danger"  v-on:click.prevent="deleteGazete(row.item.id)">Sil</b-button>
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
  import GazeteService from "../../service/GazeteService";
  export default {
    data(){
      return {
        gazete: {
          baslik: '',
          sayi: '',
          yil: '',
        },
        gazeteler: [],
        gazetelerItems: [],
        gazetelerFields: [
          { key: 'baslik', label: 'Başlık' },
          { key: 'sayi', label: 'Sayı' },
          { key: 'yil', label: 'Yıl' },
          { key: 'islemler', label: 'İşlemler' }
        ]
      }
    },

    methods: {
      async createGazete() {
        this.gazete = await GazeteService.saveGazete(this.gazete);
        this.$notification(this, 'Gazete başarılı bir şekilde kayıt edildi.');
        // if success
        this.loadGazeteler();
      },

      async deleteGazete(gazeteId) {
        console.log(gazeteId);
        await GazeteService.deleteGazete(gazeteId);
        this.$notification(this, 'Gazete başarılı bir şekilde silindi.');
        // if success
        this.loadGazeteler();
      },

      async loadGazeteler() {
        this.gazetelerItems = await GazeteService.list();
      },

      redirectSayfalar(params) {
        this.$router.push({ name: 'AddPages', params : params});
      },
    },
    beforeMount() {
      this.loadGazeteler();
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
