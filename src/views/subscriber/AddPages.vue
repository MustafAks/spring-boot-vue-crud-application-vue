<template>
  <div class="container">
    <div class="center">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h3>{{ gazete.sayi}} sayı numaralı gazete ({{ gazete.yil}})</h3>
          <h3>Sayfa Ekle</h3>
          <b-row>
            <b-col sm="4">
              <label>Sayfa No:</label>
            </b-col>
            <b-col sm="7">
              <b-form-input v-model="sayfa.sayfaNo" type = 'number'></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="4">
              <label>Dosya Ekle:</label>
            </b-col>
            <b-col sm="7">
              <b-form-file v-model="sayfa.file" class="mt-3" plain></b-form-file>
            </b-col>
          </b-row>

          <b-container class="bv-example-row">
            <b-row align-h="end">
              <b-col cols="3">
                <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="createSayfa">Kaydet</b-button>
              </b-col>
            </b-row>
          </b-container>

          <b-col >
            <div class="container">
              <h3>Sayfalar</h3>
              <div class="container">
                <div>
                  <b-table :fields="sayfalarFields" :items="sayfalarItems">
                    <template v-slot:cell(dosya)="row">
                      <b-row>
                        <b-button variant="success" v-on:click.prevent="previewPage(row.item.id)">Sayfa Önizleme</b-button>
                      </b-row>
                    </template>
                  </b-table>
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
  import GazeteService from "../../service/GazeteService";
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        gazete: {
          id: this.$route.params.id,
          baslik: this.$route.params.baslik,
          sayi: this.$route.params.sayi,
          yil: this.$route.params.yil
        },
        sayfa: {
          sayfaNo: '',
          file: null,
          gazeteler: this.gazete
        },
        sayfalarItems: [],
        sayfalarFields: [
          { key: 'sayfaNo', label: 'Sayfa No' },
          { key: 'dosya', label: 'Dosya' }
        ]
      }
    },

    methods: {
      async createSayfa() {
        let formData = new FormData();
        formData.append('file', this.sayfa.file);
        formData.append('sayfaNo',this.sayfa.sayfaNo);
        formData.append('gazeteId',this.gazete.id);

        await GazeteService.saveSayfa(formData);
        this.$notification(this, 'Sayfa başarılı bir şekilde kayıt edildi.');
        this.loadSayfalar(this.gazete.id);
      },

      async loadSayfalar(gazeteId) {
        this.sayfalarItems = await GazeteService.getSayfalar(gazeteId);
      },

      async previewPage(sayfaId) {
        //Todo
        console.log(sayfaId);
      },
    },
    beforeMount() {
      if (this.gazete.id === undefined || this.gazete.id === null) {
        this.$router.push({ name: 'AddNewspaper'});
      }
      this.loadSayfalar(this.gazete.id);
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
