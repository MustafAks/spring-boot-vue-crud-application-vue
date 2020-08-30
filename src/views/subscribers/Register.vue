<template>
    <div class="container">
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
                            label="İl :"
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
                        <b-button type="submit" variant="success" onsubmit="return false;">
                            <b-icon icon="plus"></b-icon>
                            Kaydet
                        </b-button>
                        <b-button type="reset" variant="primary" style="margin-left: 5px">Temizle</b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
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
                subscribers: {
                    name: null,
                    lastname: null,
                    startDate: null,
                    endDate: null,
                    city: null,
                    district: null,
                    address: null,
                    notes: null,
                    payment: "Not Paid",
                    user:{
                        username: null,
                        password: null
                    }
                },
                paymentArray: []
            };
        },
        methods: {
            async createSubscriber() {
                const data = JSON.parse(JSON.stringify(this.subscribers));
                data.startDate = DateConverterUtils.convertDateToTimestamp(this.subscribers.startDate);
                data.endDate = DateConverterUtils.convertDateToTimestamp(this.subscribers.endDate);
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
                if (this.subscribers.user.username !== undefined && this.subscribers.user.username !== null && this.subscribers.user.username !== '') {
                    if (this.subscribers.user.password === undefined || this.subscribers.user.password === null || this.subscribers.user.password === '') {
                        this.$errorNotification(this, 'Kullanıcı adı giriyorsanız şifre de girmelisiniz !');
                        return;
                    }
                }
                if (this.subscribers.user.password !== undefined && this.subscribers.user.password !== null && this.subscribers.user.password !== '') {
                    if (this.subscribers.user.username === undefined || this.subscribers.user.username === null || this.subscribers.user.username === '') {
                        this.$errorNotification(this, 'Şifre giriyorsanız kullanıcı adı da girmelisiniz !');
                        return;
                    }
                }
                console.log("CALLLLLL");
                await SubscriptionService.saveSubscriber(data);
                this.$notification(this, 'Abone başarılı bir şekilde kayıt edildi.');
                this.clear();
            },

            async prepare() {
                this.paymentArray = await EnumService.getPaymentArray();
            },
            clear() {
                // Reset our form values
                this.subscribers.name = null;
                this.subscribers.lastname = null;
                this.subscribers.startDate = null;
                this.subscribers.endDate = null;
                this.subscribers.city = null;
                this.subscribers.district = null;
                this.subscribers.address = null;
                this.subscribers.phone = null;
                this.subscribers.notes = null;
                this.subscribers.user.username = null;
                this.subscribers.user.password = null;
                this.subscribers.payment = "Not Paid";
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
