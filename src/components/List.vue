<template>
    <div>
        <vue-good-table
                mode="remote"
                @on-column-filter="methods.onColumnFilter($event.columnFilters)"
                :rows="rows"
                :columns="columns"
                :line-numbers="true"/>
    </div>
</template>

<script>
    import AboneDataService from "../service/AboneDataService";

    export default {
        name: 'my-component',
        data() {
            let self = this;
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
                    }/*,
                    {
                        label: 'Created On',
                        field: 'createdAt',
                        type: 'date',
                        dateInputFormat: 'yyyy-MM-dd',
                        dateOutputFormat: 'MMM Do yy',
                    },
                    {
                        label: 'Percent',
                        field: 'score',
                        type: 'percentage',
                    },*/
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
                rows: [
                    AboneDataService.list({})
                        .then(response => {
                            this.rows = response.data;
                        }),
                ],
                methods: {
                    updateParams(newProps) {
                        this.serverParams = Object.assign({}, this.serverParams, newProps);
                    },

                    onPageChange(params) {
                        this.updateParams({page: params.currentPage});
                        this.loadItems(params);
                    },

                    onPerPageChange(params) {
                        this.updateParams({perPage: params.currentPerPage});
                        this.loadItems(params);
                    },

                    onSortChange(params) {
                        this.updateParams({
                            sort: [{
                                type: params.sortType,
                                field: this.columns[params.columnIndex].field,
                            }],
                        });
                        this.loadItems(params);
                    },

                    onColumnFilter(params) {
                        this.updateParams(params);
                        this.loadItems(params);
                    },

                    // load items is what brings back the rows from server
                    loadItems(params) {
                        AboneDataService.list(params).then(response => {
                            self.rows = response.data;
                        });
                    }
                }
            };
        },
    };
</script>
