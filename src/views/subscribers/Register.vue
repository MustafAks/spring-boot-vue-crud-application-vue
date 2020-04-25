<template>
    <div class="container">
        <div id="contact-form" class="contact-form">
            <b-form @submit="createSubscriber" @reset="clear">
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
                                    v-model="user.name"
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
                                    v-model="user.lastname"
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
                                    v-model="user.startDate"
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
                            <b-form-input
                                    id="city"
                                    v-model="user.city"
                                    required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col class="col-6">
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
                                    required
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
                                    required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                                id="input-group-8"
                                label-cols-sm="4"
                                label-cols-lg="3"
                                label="Not :"
                                label-for="notes"
                        >
                            <b-form-input
                                    id="notes"
                                    v-model="user.notes"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                                id="input-group-9"
                                label-cols-sm="4"
                                label-cols-lg="3"
                                label="Ödeme Bilgisi :"
                                label-for="payment"
                        >
                            <b-form-select
                                    id="payment"
                                    v-model="user.payment"
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
                                Kaydet
                            </b-button>
                            <b-button type="reset" variant="primary" style="margin-left: 5px">Temizle</b-button>
                        </b-row>
                    </b-col>
                </b-row>
            </b-form>
        </div>
    </div>
</template>
<script>
    import SubscriptionService from '../../service/SubscriptionService';
    import EnumService from '../../service/EnumService';
    import DateConverterUtils from "../../utils/DateConverterUtils";

    export default {
        name: "register",
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
                paymentArray: []
            };
        },
        methods: {
            async createSubscriber() {
                const data = JSON.parse(JSON.stringify(this.user));
                data.startDate = DateConverterUtils.convertDateToTimestamp(this.user.startDate);
                data.endDate = DateConverterUtils.convertDateToTimestamp(this.user.endDate);
                if (this.user.name === undefined || this.user.name === null || this.user.name === '') {
                    this.$errorNotification(this, 'Lütfen adı değerini giriniz !');
                    return;
                }
                if (this.user.lastname === undefined || this.user.lastname === null || this.user.lastname === '') {
                    this.$errorNotification(this, 'Lütfen soyadı değerini giriniz !');
                    return;
                }
                if (this.user.startDate === undefined || this.user.startDate === null || this.user.startDate === '') {
                    this.$errorNotification(this, 'Lütfen başlangıç tarihi değerini giriniz !');
                    return;
                }
                if (this.user.endDate === undefined || this.user.endDate === null || this.user.endDate === '') {
                    this.$errorNotification(this, 'Lütfen bitiş tarihi değerini giriniz !');
                    return;
                }
                if (this.user.city === undefined || this.user.city === null || this.user.city === '') {
                    this.$errorNotification(this, 'Lütfen il değerini giriniz !');
                    return;
                }
                if (this.user.district === undefined || this.user.district === null || this.user.district === '') {
                    this.$errorNotification(this, 'Lütfen ilçe değerini giriniz !');
                    return;
                }
                if (this.user.address === undefined || this.user.address === null || this.user.address === '') {
                    this.$errorNotification(this, 'Lütfen adres değerini giriniz !');
                    return;
                }
                await SubscriptionService.saveSubscriber(data);
                this.$notification(this, 'Abone başarılı bir şekilde kayıt edildi.');
                this.clear();
                // if success
                this.$router.push({name: 'FilterList'});
            },

            async prepare() {
                this.paymentArray = await EnumService.getPaymentArray();
            },
            clear() {
                // Reset our form values
                this.user.name = '';
                this.user.lastname = '';
                this.user.startDate = '';
                this.user.endDate = '';
                this.user.city = '';
                this.user.district = '';
                this.user.address = '';
                this.user.notes = '';
                this.user.payment = '';
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
