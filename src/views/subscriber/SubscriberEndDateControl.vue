<template>

    <div class="center">
        <b-container fluid></b-container>
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
        <div class="container">
            <h3>Aboneler</h3>
            <div class="container">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Adı</th>
                        <th>Soyadı</th>
                        <th>İl</th>
                        <th>İlçe</th>
                        <th>Adres</th>
                        <th>Notlar</th>
                        <th>Başlangıç Tarihi</th>
                        <th>Bitiş Tarihi</th>
                        <th>Ödeme Bilgisi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="subscriber in subscriptions" v-bind:key="subscriber.id">
                        <td>{{subscriber.name}}</td>
                        <td>{{subscriber.lastname}}</td>
                        <td>{{subscriber.city}}</td>
                        <td>{{subscriber.district}}</td>
                        <td>{{subscriber.address}}</td>
                        <td>{{subscriber.notes}}</td>
                        <td>{{subscriber.startDate}}</td>
                        <td>{{subscriber.endDate}}</td>
                        <td>{{subscriber.payment}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<script>
    import SubscriptionService from '../../service/SubscriptionService';

    export default {
        name: 'subscriber-endDate-Control',
        data() {
            return {
                subscriptions: [],
                subscriber: {
                    startDate: '',
                    endDate: ''
                }
            };
        },
        methods: {
            async loadItems() {
                var startDate = this.subscriber.startDate;
                var endDate = this.subscriber.endDate;

                if (startDate === "" && endDate === "") {
                    this.$errorNotification(this, 'Başlangıç veya Bitiş tarihlerinden en az birini girmelisiniz !');
                } else {
                    this.subscriptions = await SubscriptionService.listSubscriptionExpiresViaDates(this.subscriber);
                }
            }
        }
    };


</script>
<style>
</style>
