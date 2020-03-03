<template>
  <div class="row">
    <div class="col-12">
      <b-button type="submit" variant="primary" v-on:click.prevent="redirectToNewRegisterFormPage">Abone Ekle</b-button>
    </div>

    <div class="container">
      <vue-good-table
              mode="remote"
              @on-column-filter="onColumnFilter($event.columnFilters)"
              :rows="rows"
              :columns="columns"
              :line-numbers="true">
        <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'actions'">
          <b-button variant="success">Güncelle</b-button>
          <b-button variant="danger" v-on:click.prevent="deleteRecord(props.formattedRow.id)">Sil</b-button>
        </span>
          <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
        </template>
      </vue-good-table>
    </div>

  </div>
</template>

<script>
  import AboneDataService from '../../service/AboneDataService';
  export default {
    name: 'subscriber-filter-list',
    data() {
      return {
        totalRecords: 0,
        columns: [
          {
            field: 'id',
            hidden: true
          },
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
          },{
            field: 'actions'
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
        ],
      };
    },
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

      // onSortChange(params) {
      //   this.updateParams({
      //     sort: [{
      //       type: params.sortType,
      //       field: this.columns[params.columnIndex].field,
      //     }],
      //   });
      //   this.loadItems(params);
      // },

      onColumnFilter(params) {
        this.updateParams(params);
        this.loadItems(params);
      },

      // load items is what brings back the rows from server
      async loadItems(params) {
        console.log(params);
        this.rows = await AboneDataService.list(params);
      },

      redirectToNewRegisterFormPage() {
        this.$router.push({ name: 'Register' });
      },

      async deleteRecord(id) {
        await AboneDataService.deleteAbone(id);
        const index = this.rows.findIndex(post => post.id === id);
        if (~index) { // if the post exists in array
          this.rows.splice(index, 1);
          this.$notification(this, 'Abone başarılı bir şekilde silindi.');
        } else {
          this.$errorNotification(this, 'Abone silinirken hata oluştu.');
        }
      },
    },
    beforeMount() {
      this.loadItems({});
    }
  };
</script>
<style>
</style>
