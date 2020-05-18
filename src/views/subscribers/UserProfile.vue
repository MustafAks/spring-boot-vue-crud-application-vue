<template>
  <div class="container">
      <b-row>
        <b-col class="col-3">
          <b-avatar id="avatar" size="6rem" :text=this.user.name.charAt(0)+this.user.lastname.charAt(0)></b-avatar>
          <span class="mr-auto" style="margin-left: 10px">{{this.user.name + ' ' + this.user.lastname}}</span>
          <div class="separator" style="margin-top: 10px"></div>
        </b-col>

        <b-col class="col-6">
          <b-form-group
                  id="input-group-3"
                  label-cols-sm="6"
                  label="Abonelik Başlangıç Tarihi :"
                  label-for="startDate"
          >
            {{this.user.startDate}}
          </b-form-group>
          <b-form-group
                  id="input-group-4"
                  label-cols-sm="6"
                  label="Abonelik Bitiş Tarihi :"
                  label-for="endDate"
          >
            {{this.user.endDate}}
          </b-form-group>
          <b-form-group
                  id="input-group-5"
                  label-cols-sm="6"
                  label="Şehir :"
                  label-for="city"
          >
            {{this.user.city}}
          </b-form-group>
          <b-form-group
                  id="input-group-6"
                  label-cols-sm="6"
                  label="İlçe :"
                  label-for="district"
          >
            {{this.user.district}}
          </b-form-group>
          <b-form-group
                  id="input-group-7"
                  label-cols-sm="6"
                  label="Adres :"
                  label-for="address"
          >
            {{this.user.address}}
          </b-form-group>
        </b-col>
      </b-row>
  </div>
</template>
<script>
 import SubscriptionService from '../../service/SubscriptionService';

  export default {
    data() {
      return {
        user: {
          id: '',
          name: '',
          lastname: '',
          startDate: '',
          endDate: '',
          city: '',
          district: '',
          address: '',
        }
      };
    },
    methods: {
      async getByUserName() {
        console.log("this.$store.state.username");
        console.log(this.$store.state.username);
        let data = await SubscriptionService.getByUserName(this.$store.state.username);
        data.startDate = new Date(data.startDate).toLocaleDateString();
        data.endDate = new Date(data.endDate).toLocaleDateString();
        this.user = data;
      },
    },
    beforeMount() {
      this.getByUserName();
    }
  };
</script>
<style>
  .separator {
    border-bottom: solid 1px #ccc;
    margin-bottom: 15px;
  }
</style>
