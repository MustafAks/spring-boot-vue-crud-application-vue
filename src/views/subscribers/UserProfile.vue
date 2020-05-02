<template>
  <div class="container">
      <b-row>
        <b-col class="col-6">
          <div>
            <b-avatar size="100px" :text=this.user.username.charAt(0)+this.user.lastname.charAt(0)></b-avatar>
          </div>
          <b-form-group
                  id="input-group-1"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Adı :"
                  label-for="name"
          >
            <text
                    id="name"
                    v-model="user.name"
            ></text>
          </b-form-group>
          <b-form-group
                  id="input-group-2"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Soyadı :"
                  label-for="lastName"
          >
            <text
                    id="lastName"
                    v-model="user.lastname"
            ></text>
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
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
                  id="input-group-5"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Şehir :"
                  label-for="city"
          >
            <text
                    id="city"
                    v-model="user.city"
            ></text>
          </b-form-group>
          <b-form-group
                  id="input-group-6"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="İlçe :"
                  label-for="district"
          >
            <text
                    id="district"
                    v-model="user.district"
            ></text>
          </b-form-group>
          <b-form-group
                  id="input-group-7"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Adres :"
                  label-for="address"
          >
            <text
                    id="address"
                    v-model="user.address"
            ></text>
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
          id: this.$route.params.id,
          name: this.$route.params.name,
          lastname: this.$route.params.lastname,
          startDate: this.$route.params.startDate,
          endDate: this.$route.params.endDate,
          city: this.$route.params.city,
          district: this.$route.params.district,
          address: this.$route.params.address,
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
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))  : null;
        this.user = await SubscriptionService.getByUserName(user);
       // this.$router.push({ name: 'FilterList' });
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
