<template>
  <div class="container">
    <div class="center">
      <b-container fluid>
        <b-row>
          <b-col sm="4">
            <label>Adı:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.adi"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Soyadı:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.soyadi"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Başlangıç Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.baslangicTarihi"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Bitiş Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.bitisTarihi"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İl:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.il"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İlçe:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.ilce"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Adres:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.adres"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Notlar:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.notlar"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Para Alındı:</label>
          </b-col>
          <b-col sm="7">
            <b-form-checkbox id="checkbox-1" name="checkbox-1" v-model="user.paraAlindi" value=true unchecked-value=false></b-form-checkbox>
          </b-col>
        </b-row>
        <b-container class="bv-example-row">
          <b-row align-h="end">
            <b-col cols="3">
              <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="create">Güncelle</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
  </div>
</template>

<script>
  import AboneDataService from '../../service/AboneDataService';
  export default {
    name: "update",
    data() {
      return {
        user: {
          id: this.$route.params.id,
          adi: this.$route.params.adi,
          soyadi: this.$route.params.soyadi,
          baslangicTarihi: this.$route.params.baslangicTarihi,
          bitisTarihi: this.$route.params.bitisTarihi,
          il: this.$route.params.il,
          ilce: this.$route.params.ilce,
          adres: this.$route.params.adres,
          notlar: this.$route.params.notlar,
          paraAlindi: this.$route.params.paraAlindi
        }
      };
    },
    methods: {
      async create() {
        this.user = await AboneDataService.saveAbone(this.user);
        this.$notification(this, 'Abone başarılı bir şekilde güncellendi.');
        // if success
        this.$router.push({ name: 'FilterList' });
      }
    }
  };
</script>
<style>
  img {
    max-width: 100%;
  }
</style>
