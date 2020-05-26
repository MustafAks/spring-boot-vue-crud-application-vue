<template>
  <div class="row">
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
  import NewsService from '../../service/NewsService';

  export default {
    name: 'news-filter-list',
    data() {
      return {
        totalRecords: 0,
        columns: [
          {
            field: 'id',
            hidden: true
          },
          {
            field: 'image',
            hidden: true
          },
          {
            label: 'Başlık',
            field: 'title',
            filterOptions: {
              enabled: true, // enable filter for this column
              placeholder: 'Filter This Thing', // placeholder for filter input
              filterDropdownItems: [], // dropdown (with selected values) instead of text input
              // filterFn: this.columnFilterFn, //custom filter function that
              trigger: 'enter', //only trigger on enter not on keyup
            }
          },
          {
            label: 'Açıklama',
            field: 'description',
            filterOptions: {
              enabled: true, // enable filter for this column
              placeholder: 'Filter This Thing', // placeholder for filter input
              filterDropdownItems: [], // dropdown (with selected values) instead of text input
              // filterFn: this.loadItems(), //custom filter function that
              trigger: 'enter', //only trigger on enter not on keyup
            }
          },
          {
            label: 'İçerik',
            field: 'news',
            filterOptions: {
              enabled: true, // enable filter for this column
              placeholder: 'Filter This Thing', // placeholder for filter input
              filterDropdownItems: [], // dropdown (with selected values) instead of text input
              // filterFn: this.columnFilterFn, //custom filter function that
              trigger: 'enter', //only trigger on enter not on keyup
            }
          },{
            field: 'actions'
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
        rows: [
        ],
        paymentArray : []
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

      onColumnFilter(params) {
        this.updateParams(params);
        this.loadItems(params);
      },

      // load items is what brings back the rows from server
      async loadItems(params) {
        this.rows = await NewsService.list(params);
      },

      updateRecord(params) {
        this.$router.push({ name: 'UpdateNews', params : params });
      },

      async deleteRecord(id) {
        await NewsService.deleteNews(id);
        const index = this.rows.findIndex(post => post.id === id);
        if (~index) { // if the post exists in array
          this.rows.splice(index, 1);
          this.$notification(this, 'Haber başarılı bir şekilde silindi.');
        } else {
          this.$errorNotification(this, 'Haber silinirken hata oluştu.');
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
