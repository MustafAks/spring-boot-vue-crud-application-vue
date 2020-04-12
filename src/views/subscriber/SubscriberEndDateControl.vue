<template>
    <div class="container">
        <div class="center">
            <b-container class="bv-example-row">
                <b-row>
                    <b-col sm="4">
                        <label>Başlangıç Tarihi:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-datepicker
                                id="startDate" v-model="subscriber.startDate"
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
                                id="endDate" v-model="subscriber.endDate"
                                dark
                                :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="tr"></b-form-datepicker>
                    </b-col>
                </b-row>
                <div class="col-12" align="right">
                    <b-button type="submit" variant="primary" v-on:click.prevent="loadItems">Ara</b-button>
                </div>
            </b-container>
        </div>
        <b-container class="bv-example-row">
            <div class="container">
                <h3>Aboneler</h3>
                <div class="container">
                    <div>
                        <b-table :fields="subscriberFields" :items="subscriptions">
                        </b-table>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
    import SubscriptionService from '../../service/SubscriptionService';
    import DateConverterUtils from '../../utils/DateConverterUtils';
    import EnumService from "../../service/EnumService";

    export default {
        name: 'subscriber-endDate-Control',
        data() {
            return {
                subscriptions: [],
                subscriber: {
                    startDate: null,
                    endDate: null
                },
                subscriberFields: [
                    {key: 'name', label: 'Adı'},
                    {key: 'lastname', label: 'Soyadi'},
                    {key: 'city', label: 'İl'},
                    {key: 'district', label: 'İlçe'},
                    {key: 'address', label: 'Adres'},
                    {key: 'notes', label: 'Notlar'},
                    {key: 'startDate', label: 'Başlangıç Tarihi'},
                    {key: 'endDate', label: 'Bitiş Tarihi'},
                    {key: 'payment', label: 'Ödeme Bilgisi'}
                ],
                paymentArray : []
            };
        },
        methods: {
            async loadItems() {
                var startDate = this.subscriber.startDate;
                var endDate = this.subscriber.endDate;

                if ((startDate === undefined || startDate === null) && (endDate === undefined || endDate === null)) {
                    this.$errorNotification(this, 'Başlangıç veya Bitiş tarihlerinden en az birini girmelisiniz !');
                } else {
                    startDate != null ? DateConverterUtils.convertDateToTimestamp(this.subscriber.startDate) : null;
                    endDate != null ? DateConverterUtils.convertDateToTimestamp(this.subscriber.endDate) : null;
                    var data = {
                        startDate: startDate,
                        endDate: endDate
                    };
                    const paymentArray = this.paymentArray;
                    let subscriptions = await SubscriptionService.listSubscriptionExpiresViaDates(data);
                    subscriptions.forEach(function (subscription) {
                        subscription.startDate = new Date(subscription.startDate).toLocaleDateString();
                        subscription.endDate = new Date(subscription.endDate).toLocaleDateString();
                        paymentArray.forEach(function (element) {
                            if (subscription.payment === element.value) {
                                subscription.payment = element.key;
                            }
                        })
                    });
                    this.subscriptions = subscriptions;
                }
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
</style>
