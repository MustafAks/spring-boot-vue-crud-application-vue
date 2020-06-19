<template>
  <div class="container">
      <b-overlay :show="show" rounded="sm">
          <b-tabs content-class="mt-3">
              <b-tab v-for="year in years" :key=year :title=year.toString() @click="onChange(year)">
                  <b-col>
                      <b-card no-body class="mb-1" v-for="newspaper in newspapers" :key=newspaper.id>
                          <b-card-header header-tag="header" class="p-1" role="tab">
                              <b-link v-b-toggle = "newspaper.id" @click="onClick(newspaper.id)">{{ newspaper.title }} Sayısı İçin Tıklayınız...</b-link>
    <!--                          <b-button block href="#" v-b-toggle = "newspaper.id" variant="outline-primary" @click="onClick(newspaper.id)">{{ newspaper.title }}</b-button>-->
                          </b-card-header>
                          <b-collapse :id=newspaper.id accordion="my-accordion" role="tabpanel" class="swatch__container">
                              <li v-for="page in pages" :key=page.id class="swatch__wrapper" style="text-align:center">
                                  <a :href="'#/embeddedFile?pageId=' + page.id">
                                      <img :href="'#/embeddedFile?pageId=' + page.id" :src=image>
                                      <b-link :href="'#/embeddedFile?pageId=' + page.id">{{ page.pageNumber }}. Sayfa</b-link>
                                  </a>
                              </li>
                          </b-collapse>
                      </b-card>
                  </b-col>
              </b-tab>
          </b-tabs>
          <template v-slot:overlay>
              <div class="text-center">
                  <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                  <p id="cancel-label">Lütfen Bekleyin...</p>
              </div>
          </template>
      </b-overlay>
  </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import image from "../../assets/images/NavbarImages/hasretNavbarImage.jpeg"

export default {
    data() {
        return {
            years: [],
            newspapers: [],
            pages: [],
            image: image,
            show: true
        }
    },

    mounted() {
        this.show = false;
    },

    methods: {
        async getYears() {
            this.years = await NewspaperService.getYears();
            if (this.years !== undefined && this.years !== null && this.years.length > 0) {
                this.getNewspapersByYear(this.years[0])
            }
        },

        async getNewspapersByYear(year) {
            this.newspapers = await NewspaperService.getNewspapersByYear(year);
        },

        async getPagesByNewspaperId(newspaperId) {
            this.pages = await NewspaperService.getPagesByNewspaperId(newspaperId, 'Asc');
        },

        async onChange(year) {
            this.getNewspapersByYear(year);
        },

        async onClick(newspaperId) {
            this.getPagesByNewspaperId(newspaperId);
        },
    },
    beforeMount() {
        this.getYears();
    }
}
</script>
<style>
    body {
        background: #F2F3F4;
    }

    img {
        max-width: 100%;
    }

    .swatch__container {
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .swatch__wrapper {
        padding: 10px 10px 10px 10px;
        display: inline-block;
        width: 25%;
        list-style: none;
        margin-top: 1.4em;
        margin-bottom: 1.4em;
        cursor: pointer;
    }
</style>
