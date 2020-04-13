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
                <b-row>
                    <b-col sm="8">
                        <h3>Aboneler</h3>
                    </b-col>
                    <b-col sm="4" align="right">
                        <b-button type="submit" variant="primary" v-on:click.prevent="downloadPdf">Çıktı Al</b-button>
                    </b-col>
                </b-row>
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
    import GeneratePdfUtils from "../../utils/GeneratePdfUtils";

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
                    {key: 'lastname', label: 'Soyadı'},
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

            downloadPdf () {
                var headers = ['','Adı', 'Soyadı', 'İl', 'İlçe', 'Adres', 'Notlar', 'Başlangıç Tarihi', 'Bitiş Tarihi', 'Ödeme'];
                var columns = ['name', 'lastname', 'city', 'district', 'address', 'notes', 'startDate','endDate', 'payment'];
                var content = {
                    pageOrientation: 'landscape',
                    content: [
                        this.prepareBody(this.subscriptions, columns, headers)
                    ]
                };
                GeneratePdfUtils.download(content, "aboneligiBitenler");
            },

            prepareBody(rows, columns, headers) {
                var body = [];
                var index = 1;
                body.push(headers);

                rows.forEach(function (row) {
                    var dataRow = [];
                    columns.forEach(function (column) {
                        let rowElement = row[column];
                        if (rowElement === undefined || rowElement === null) {
                            dataRow.push("");
                        } else {
                            dataRow.push(rowElement.toString());
                        }
                    });
                    dataRow.splice(0, 0, index);
                    body.push(dataRow);
                    index++;
                });

                return {
                    table: {
                        headerRows: 1,
                        body: body
                    }
                };
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
