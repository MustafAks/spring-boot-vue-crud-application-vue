<template>
  <div class="container">
    <div class="center">
      <b-container fluid>
        <b-row>
          <b-col sm="4">
            <label>Adı:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.name"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Soyadı:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.lastname"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Başlangıç Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <b-form-datepicker
                    id="startDate" v-model="user.startDate"
                    dark
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Bitiş Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <b-form-datepicker
                    id="endDate" v-model="user.endDate"
                    dark
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İl:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.city"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İlçe:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.district"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Adres:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.address"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Notlar:</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="user.notes"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Ödeme Bilgisi:</label>
          </b-col>
          <b-col sm="7">
            <b-form-select v-model="user.payment" class="mb-3">
              <b-form-select-option value="Not Paid">Alınmadı</b-form-select-option>
              <b-form-select-option value="Paid">Alındı</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-container class="bv-example-row">
          <b-row align-h="end">
            <b-col cols="3">
              <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="updateSubscriber">Güncelle</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
  </div>
</template>

<script>
  import SubscriptionService from '../../service/SubscriptionService';
  export default {
    name: "update",
    data() {
      return {
        user: {
          id: this.$route.params.id,
          name: this.$route.params.name,
          lastname: this.$route.params.lastname,
          startDate: this.$route.params.startDate,
          endDate: this.$route.params.endDate,
          city: this.$route.params.city,
          district: this.$route.params.district,
          address: this.$route.params.address,
          notes: this.$route.params.notes,
          payment: this.$route.params.payment
        }
      };
    },
    methods: {
      async updateSubscriber() {
        this.user = await SubscriptionService.saveSubscriber(this.user);
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
