<template>
  <div class="container">
    <b-form @submit="updateSubscriber">
      <b-row>
        <b-col class="col-6">
          <b-form-group
                  id="input-group-1"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Adı :"
                  label-for="name"
          >
            <b-form-input
                    id="name"
                    v-model="subscribers.name"
                    required
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-2"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Soyadı :"
                  label-for="lastName"
          >
            <b-form-input
                    id="lastName"
                    v-model="subscribers.lastname"
                    required
            ></b-form-input>
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
                    v-model="subscribers.startDate"
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
          <b-form-group
                  id="input-group-4"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Bitiş Tarihi :"
                  label-for="endDate"
          >
            <b-form-datepicker
                    id="endDate"
                    v-model="subscribers.endDate"
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
            <b-form-input
                    id="city"
                    v-model="subscribers.city"
                    required
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
                    v-model="subscribers.district"
                    required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-6">
          <b-form-group
                  id="input-group-7"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Adres :"
                  label-for="address"
          >
            <b-form-input
                    id="address"
                    v-model="subscribers.address"
                    required
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-8"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Telefon :"
                  label-for="phone"
          >
            <b-form-input
                    id="phone"
                    v-model="subscribers.phone"
                    required
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-9"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Not :"
                  label-for="notes"
          >
            <b-form-input
                    id="notes"
                    v-model="subscribers.notes"
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-10"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Kullanıcı Adı :"
                  label-for="username"
          >
            <b-form-input
                    id="username"
                    v-model="subscribers.user.username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-11"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Şifre :"
                  label-for="password"
          >
            <b-form-input
                    id="password"
                    v-model="subscribers.user.password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
                  id="input-group-12"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Ödeme Bilgisi :"
                  label-for="payment"
          >
            <b-form-select
                    id="payment"
                    v-model="subscribers.payment"
                    class="mb-3"
                    :options=paymentArray
                    value-field="value"
                    text-field="key"
                    required
            ></b-form-select>
          </b-form-group>
          <b-row align-h="end">
            <b-button type="submit" variant="success">
              <b-icon icon="plus"></b-icon>
              Güncelle
            </b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>
  import SubscriptionService from '../../service/SubscriptionService';
  import EnumService from "../../service/EnumService";
  export default {
    name: "update",
    data() {
      return {
        subscribers: {
          id: this.$route.params.id,
          name: this.$route.params.name,
          lastname: this.$route.params.lastname,
          startDate: this.$route.params.startDate,
          endDate: this.$route.params.endDate,
          city: this.$route.params.city,
          district: this.$route.params.district,
          address: this.$route.params.address,
          phone: this.$route.params.phone,
          notes: this.$route.params.notes,
          payment: this.$route.params.payment,
          user:{
            username: this.$route.params.username,
            password: null
          }
        },
        paymentArray : []
      };
    },
    methods: {
      async updateSubscriber() {
        if (this.subscribers.name === undefined || this.subscribers.name === null || this.subscribers.name === '') {
          this.$errorNotification(this, 'Lütfen adı değerini giriniz !');
          return;
        }
        if (this.subscribers.lastname === undefined || this.subscribers.lastname === null || this.subscribers.lastname === '') {
          this.$errorNotification(this, 'Lütfen soyadı değerini giriniz !');
          return;
        }
        if (this.subscribers.startDate === undefined || this.subscribers.startDate === null || this.subscribers.startDate === '') {
          this.$errorNotification(this, 'Lütfen başlangıç tarihi değerini giriniz !');
          return;
        }
        if (this.subscribers.endDate === undefined || this.subscribers.endDate === null || this.subscribers.endDate === '') {
          this.$errorNotification(this, 'Lütfen bitiş tarihi değerini giriniz !');
          return;
        }
        if (this.subscribers.city === undefined || this.subscribers.city === null || this.subscribers.city === '') {
          this.$errorNotification(this, 'Lütfen il değerini giriniz !');
          return;
        }
        if (this.subscribers.district === undefined || this.subscribers.district === null || this.subscribers.district === '') {
          this.$errorNotification(this, 'Lütfen ilçe değerini giriniz !');
          return;
        }
        if (this.subscribers.address === undefined || this.subscribers.address === null || this.subscribers.address === '') {
          this.$errorNotification(this, 'Lütfen adres değerini giriniz !');
          return;
        }
        if (this.subscribers.phone === undefined || this.subscribers.phone === null || this.subscribers.phone === '') {
          this.$errorNotification(this, 'Lütfen telefon değerini giriniz !');
          return;
        }
        if (this.$route.params.username !== undefined
                && this.$route.params.username !== null
                && this.$route.params.username !== ''
                && this.subscribers.user.username !== undefined
                && this.subscribers.user.username !== null
                && this.$route.params.username !== this.subscribers.user.username) {
          // önceden bir user oluşturulmuş yani username i var ve bu alanı update etmeye çalışıyorsa
          //password göndermek zorunda
          if (this.subscribers.user.password === undefined
                  || this.subscribers.user.password === null
                  || this.subscribers.user.password === '') {
            this.$errorNotification(this, 'Kullanıcı adını güncellemeye çalıştığınız için şifre girmelisiniz.');
            return;
          }
        }

        if ((this.$route.params.username === undefined
                || this.$route.params.username === null
                || this.$route.params.username === '')
                && (this.subscribers.user.username !== undefined
                        && this.subscribers.user.username !== null
                        && this.subscribers.user.username !== '')) {
          //önceden user oluşturulmamış yani username alanı boşsa ve şimdi kullanıcı eklemek isteniyorsa
          //username ile birlikte password de girmeli.
          if (this.subscribers.user.password === undefined
                  || this.subscribers.user.password === null
                  || this.subscribers.user.password === '') {
            this.$errorNotification(this, 'Kullanıcı eklemeye çalıştığınız için şifre de girmelisiniz.');
            return;
          }
        }
        await SubscriptionService.saveSubscriber(this.subscribers);
        this.$notification(this, 'Abone başarılı bir şekilde güncellendi.');
        // if success
        this.$router.push({ name: 'FilterList' });
      },

      async prepare() {
        this.paymentArray = await EnumService.getPaymentArray();
      }
    },
    beforeMount() {
      this.prepare();
    }
  };
</script>
<style>
  img {
    max-width: 100%;
  }
</style>
