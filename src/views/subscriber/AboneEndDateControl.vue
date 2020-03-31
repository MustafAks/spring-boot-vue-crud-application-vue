<template>

    <div class="form-row">
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
                        locale="en"></b-form-datepicker>
            </b-col>
        </b-row>

        <div class="col-12">
            <b-button type="submit" variant="primary" v-on:click.prevent="loadItems">Ara</b-button>
        </div>
        <div class="container">
            <vue-good-table
                    mode="remote"
                    :rows="rows"
                    :columns="columns"
                    :line-numbers="true"/>
        </div>

    </div>
</template>

<script>
    import AboneDataService from '../../service/AboneDataService';

    export default {
        name: 'abone-endDate-Control',
        data() {
            return {
                totalRecords: 0,
                columns: [
                    {
                        label: 'Adı',
                        field: 'adi',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.columnFilterFn, //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'Soyadı',
                        field: 'soyadi',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.loadItems(), //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'Başlangıç Tarihi',
                        field: 'baslangicTarihi',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.loadItems(), //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'İl',
                        field: 'il',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.columnFilterFn, //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'İlçe',
                        field: 'ilce',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.columnFilterFn, //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'Adres',
                        field: 'adres',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.columnFilterFn, //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    },
                    {
                        label: 'Notlar',
                        field: 'notlar',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            filterDropdownItems: [], // dropdown (with selected values) instead of text input
                            // filterFn: this.columnFilterFn, //custom filter function that
                            trigger: 'enter', //only trigger on enter not on keyup
                        }
                    }
                ],
                serverParams: {
                    columnFilters: {},
                    sort: {
                        field: '',
                        type: '',
                    },
                    page: 1,
                    perPage: 10
                },
                rows: [],
                abone: {
                    startDate: '',
                    endDate: ''
                }
            };
        },
        methods: {
            async loadItems() {
                const startDate = this.abone.startDate;
                const endDate = this.abone.endDate;
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
