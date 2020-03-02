<template>
  <div class="row">

    <div class="container">
      <h2>Kayıt</h2>
      <label><b>Username</b></label>
      <input type="text" v-model="user.username">
      <br>
      <label><b>Description</b></label>
      <input type="text" v-model="user.description">
    </div>

    <div class="col-12">
      <b-button type="submit" variant="primary" v-on:click.prevent="create">Kaydet</b-button>
    </div>

  </div>
</template>

<script>
  import AboneDataService from '../../service/AboneDataService';
  export default {
    name: "register",
    data() {
      return {
        user: {
          username: "",
          description: ""
        }
      };
    },
    methods: {
      async create() {
        this.user = await AboneDataService.saveAbone(this.user);
        this.$notification(this, 'Abone başarılı bir şekilde kayıt edildi.');
        // if success
        this.$router.push({ name: 'SubscriberList' });
      }
    }
  };
</script>
<style>
</style>
