<template>
  <div class="container">
      <b-row>
        <b-col class="col-6">
          <b-form-group
                  id="input-group-1"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label-for="avatar"
          >
            <b-avatar id="avatar" size="100px" :text=this.user.name.charAt(0)+this.user.lastname.charAt(0)></b-avatar>
          </b-form-group>
          <b-form-group
                  id="input-group-3"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Başlangıç Tarihi :"
                  label-for="startDate"
          >
            <b-form-datepicker
                    id="startDate"
                    v-model="user.startDate"
                    dark
                    placeholder="Seçiniz"
                    today-button label-today-button="Bugün"
                    reset-button label-reset-button="Sil"
                    close-button label-close-button="Kapat"
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"
                    aria-required="true"
                    :text=this.user.startDate
                    disabled
            ></b-form-datepicker>
          </b-form-group>

        </b-col>
        <b-col class="col-6">
          <b-form-group
                  id="input-group-4"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Bitiş Tarihi :"
                  label-for="endDate"
          >
            <b-form-datepicker
                    id="endDate"
                    v-model="user.endDate"
                    dark
                    placeholder="Seçiniz"
                    today-button label-today-button="Bugün"
                    reset-button label-reset-button="Sil"
                    close-button label-close-button="Kapat"
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"
                    required
                    :text=this.user.endDate
                    disabled
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
                  id="input-group-5"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Şehir :"
                  label-for="city"
          >
            <b-form-input
                    id="city"
                    v-model="user.city"
                    :text=this.user.city
                    disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-6"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="İlçe :"
                  label-for="district"
          >
            <b-form-input
                    id="district"
                    v-model="user.district"
                    :text=this.user.district
                    disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-7"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Adres :"
                  label-for="address"
          >
            <b-form-input
                    id="address"
                    v-model="user.address"
                    :text=this.user.address
                    disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
  </div>
</template>
<script>
 // import SubscriptionService from '../../service/SubscriptionService';
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
        },
        userFromStorage: {
          username:'',
          password:'',
          role:'',
          enabled:''
        }
      };
    },
    methods: {
      async getByUserName() {
       // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))  : null;
        //this.user = await SubscriptionService.getByUserName(user);
        this.user.name="beyza";
        this.user.lastname="ekici";
        this.user.address="mamak";
        this.user.city="ankara";
        this.user.district="mamak";
        return this.user;
      },
    },
    beforeMount() {
      this.getByUserName();
    }
  };
</script>
<style>
  img {
    max-width: 100%;
  }
</style>
