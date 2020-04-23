<template>
  <div class="container">
    <div class="center">
      <b-container fluid>
        <b-row>
          <b-col sm="4">
            <label>Adı:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="name" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-input v-model="user.name" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Soyadı:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="lastName" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-input v-model="user.lastname" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Başlangıç Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="startDate" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-datepicker
                    id="startDate" v-model="user.startDate"
                    dark placeholder="Seçiniz"
                    today-button label-today-button = "Bugün"
                    reset-button label-reset-button = "Sil"
                    close-button label-close-button = "Kapat"
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"
                    :state='errors[0] ? false : (valid ? true : null)'
            ></b-form-datepicker>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Bitiş Tarihi:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="endDate" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-datepicker
                    id="endDate" v-model="user.endDate"
                    dark placeholder="Seçiniz"
                    today-button label-today-button = "Bugün"
                    reset-button label-reset-button = "Sil"
                    close-button label-close-button = "Kapat"
                    :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="tr"
                    :state='errors[0] ? false : (valid ? true : null)'
            ></b-form-datepicker>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İl:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="city" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-input v-model="user.city" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>İlçe:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="district" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-input v-model="user.district" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <label>Adres:</label>
          </b-col>
          <b-col sm="7">
            <ValidationProvider name="address" rules="required">
              <b-form-group slot-scope="{ valid, errors }">
            <b-form-input v-model="user.address" :state='errors[0] ? false : (valid ? true : null)'></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
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
            <div>
              <ValidationProvider name="address" rules="required">
                <b-form-group slot-scope="{ valid, errors }">
              <b-form-select v-model="user.payment" class="mb-3" :options=paymentArray value-field="value" text-field="key" :state='errors[0] ? false : (valid ? true : null)'>
              </b-form-select>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </div>
          </b-col>
        </b-row>
        <b-container class="bv-example-row">
          <b-row align-h="end">
            <b-col cols="3">
              <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="createSubscriber">Kaydet</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
  </div>
</template>

<script>
  import SubscriptionService from '../../service/SubscriptionService';
  import EnumService from '../../service/EnumService';
  import DateConverterUtils from "../../utils/DateConverterUtils";
  import { ValidationProvider } from 'vee-validate';

  export default {
    name: "register",
    components: {
      ValidationProvider
    },
    data() {
      return {
        user: {
          name: null,
          lastname: null,
          startDate: null,
          endDate: null,
          city: null,
          district: null,
          address: null,
          notes: null,
          payment: "Not Paid"
        },
        paymentArray : []
      };
    },
    methods: {
      async createSubscriber() {
        const data = JSON.parse(JSON.stringify(this.user));
        data.startDate = DateConverterUtils.convertDateToTimestamp(this.user.startDate);
        data.endDate = DateConverterUtils.convertDateToTimestamp(this.user.endDate);
        if (this.user.name===undefined || this.user.name===null || this.user.name===''){
          this.$errorNotification(this, 'Lütfen adı değerini giriniz !');
          return;
        }
        if (this.user.lastname===undefined || this.user.lastname===null || this.user.lastname===''){
          this.$errorNotification(this, 'Lütfen soyadı değerini giriniz !');
          return;
        }
        if (this.user.startDate===undefined || this.user.startDate===null || this.user.startDate===''){
          this.$errorNotification(this, 'Lütfen başlangıç tarihi değerini giriniz !');
          return;
        }
        if (this.user.endDate===undefined || this.user.endDate===null || this.user.endDate===''){
          this.$errorNotification(this, 'Lütfen bitiş tarihi değerini giriniz !');
          return;
        }
        if (this.user.city===undefined || this.user.city===null || this.user.city===''){
          this.$errorNotification(this, 'Lütfen il değerini giriniz !');
          return;
        }
        if (this.user.district===undefined || this.user.district===null || this.user.district===''){
          this.$errorNotification(this, 'Lütfen ilçe değerini giriniz !');
          return;
        }
        if (this.user.address===undefined || this.user.address===null || this.user.address===''){
          this.$errorNotification(this, 'Lütfen adres değerini giriniz !');
          return;
        }
        await SubscriptionService.saveSubscriber(data);
        this.$notification(this, 'Abone başarılı bir şekilde kayıt edildi.');
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
