<template>
  <div class="container">
      <b-tabs content-class="mt-3">
          <b-tab v-for="year in years" :key=year :title=year.toString() @click="onChange(year)">
              <b-col>
                  <b-card no-body class="mb-1" v-for="newspaper in newspapers" :key=newspaper.id>
                      <b-card-header header-tag="header" class="p-1" role="tab">
                          <b-link href="#" v-b-toggle = "newspaper.id" @click="onClick(newspaper.id)">{{ newspaper.title }} Sayısı İçin Tıklayınız...</b-link>
<!--                          <b-button block href="#" v-b-toggle = "newspaper.id" variant="outline-primary" @click="onClick(newspaper.id)">{{ newspaper.title }}</b-button>-->
                      </b-card-header>
                      <b-collapse :id=newspaper.id accordion="my-accordion" role="tabpanel" class="swatch__container">
                          <li v-for="page in pages" :key=page.id class="swatch__wrapper" style="text-align:center">
                              <div @click="linkClick(page.id)">
                                  <img :src=image>
                                  <b-link>{{ page.pageNumber }}. Sayfa</b-link>
                              </div>
                          </li>
                      </b-collapse>
                  </b-card>
              </b-col>
          </b-tab>
      </b-tabs>
  </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import image from "../../assets/images/NavbarImages/hasretNavbarImage.jpeg"
import GeneratePdfUtils from "../../utils/GeneratePdfUtils";

export default {
  data(){
    return {
      years: [],
      newspapers: [],
      pages: [],
      image: image
    }
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

      async linkClick(pageId) {
          await GeneratePdfUtils.openWithPageId(pageId);
      }
  },
  beforeMount() {
    this.getYears();
  }
}
</script>
<style>
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
