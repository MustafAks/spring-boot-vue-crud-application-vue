<template>
  <div class="row">
    <div class="col-12">
      <b-button type="submit" variant="primary" v-on:click.prevent="redirectToNewRegisterFormPage">Abone Ekle</b-button>
    </div>
    <div class="col-12">
      <b-button type="submit" variant="primary" v-on:click.prevent="downloadPdf">Çıktı Al</b-button>
    </div>

    <div class="container">
      <vue-good-table
              mode="remote"
              @on-column-filter="onColumnFilter($event.columnFilters)"
              :rows="rows"
              :columns="columns"
              :line-numbers="true">

        <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'actions'">
          <b-row>
            <b-button variant="success" class="w-100" v-on:click.prevent="updateRecord(props.formattedRow)">Güncelle</b-button>
            <b-button variant="danger"  class="w-100" v-on:click.prevent="deleteRecord(props.formattedRow.id)">Sil</b-button>
          </b-row>
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
  import GeneratePdfUtils from '../../utils/GeneratePdfUtils';

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
            label: 'Bitiş Tarihi',
            field: 'bitisTarihi',
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
          },
          {
            label: 'Ödeme Bilgisi',
            field: 'odeme',
            filterOptions: {
              enabled: true, // enable filter for this column
              placeholder: 'Seçiniz', // placeholder for filter input
              filterDropdownItems: ["Alınmadı","Alındı"], // dropdown (with selected values) instead of text input
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

      downloadPdf () {
        var headers = ['','Adı', 'Soyadı', 'Başlangıç Tarihi', 'Bitiş Tarihi', 'İl', 'İlçe', 'Adres', 'Notlar', 'Ödeme'];
        var columns = ['adi', 'soyadi', 'baslangicTarihi','bitisTarihi', 'il', 'ilce', 'adres', 'notlar', 'odeme'];
        var content = {
          pageOrientation: 'landscape',
          content: [
            this.prepareBody(this.rows, columns, headers)
          ]
        };
        GeneratePdfUtils.download(content, "filtrelenmisAboneler");
      },

      prepareBody(rows, columns, headers) {
        var body = [];
        var index = 1;
        body.push(headers);

        rows.forEach(function (row) {
          var dataRow = [];
          columns.forEach(function (column) {
            dataRow.push(row[column].toString());
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

      updateRecord(params) {
        console.log(params);
        this.$router.push({ name: 'Update', params : params });
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
