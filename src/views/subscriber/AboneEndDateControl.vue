<template>

    <div class="center">
        <b-container fluid></b-container>
        <b-row>
            <b-col sm="4">
                <label>Başlangıç Tarihi:</label>
            </b-col>
            <b-col sm="7">
                <!--<b-form-datepicker id="startDate" v-model="abone.startDate"-->
                <!--class="mb-2"></b-form-datepicker>-->
                <b-form-datepicker
                        id="startDate" v-model="abone.startDate"
                        :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        locale="en"></b-form-datepicker>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="4">
                <label>Bitiş Tarihi:</label>
            </b-col>
            <b-col sm="7">
                <!--<b-form-datepicker id="endDate" v-model="abone.endDate" class="mb-2"></b-form-datepicker>-->
                <b-form-datepicker
                        id="endDate" v-model="abone.endDate"
                        :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        locale="tr"></b-form-datepicker>
            </b-col>
        </b-row>
        <div class="col-12">
            <b-button align="center" type="submit" variant="primary" v-on:click.prevent="loadItems">Ara</b-button>
        </div>
        <div class="container">
            <h3>Get All</h3>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="abone in aboneler" v-bind:key="abone.id">
                        <td>{{abone.adi}}</td>
                        <td>{{abone.soyadi}}</td>
                        <td>{{abone.il}}</td>
                        <td>{{abone.ilce}}</td>
                        <td>{{abone.adres}}</td>
                        <td>{{abone.notlar}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<script>
    import AboneDataService from '../../service/AboneDataService';

    export default {
        name: 'abone-endDate-Control',
        data() {
            return {
                aboneler: [],
                message: null,
                INSTRUCTOR: "Project - X",
                abone: {
                    startDate: '',
                    endDate: ''
                }
            };
        },
        methods: {
            async loadItems() {
                var startDate = this.abone.startDate;
                var endDate = this.abone.endDate;

                if (startDate == null && endDate == null) {
                    this.$errorNotification(this, 'Başlangıç veya Bitiş tarihlerinden en az birini girmelisiniz !');
                }
                this.rows = await AboneDataService.listSubscriptionExpiresViaDates(this.abone);
            },
        },
        beforeMount() {
            this.loadItems({});
        }
    };


</script>
<style>
</style>
