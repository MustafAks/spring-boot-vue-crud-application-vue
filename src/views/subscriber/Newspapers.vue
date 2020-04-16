<template>
  <div class="container">
      <b-tabs content-class="mt-3">
          <b-tab v-for="year in years" :key=year :title=year.toString() @click="onChange(year)">
              <b-col>

                  <b-card no-body class="mb-1" v-for="newspaper in newspapers" :key=newspaper.id>
                      <b-card-header header-tag="header" class="p-1" role="tab">
                          <b-button block href="#" v-b-toggle = "newspaper.id" variant="info" @click="onClick(newspaper.id)">{{ newspaper.title }}</b-button>
                      </b-card-header>
                      <b-collapse :id=newspaper.id accordion="my-accordion" role="tabpanel">
                          <b-card-body>
                                <b-card-group deck>
                                    <b-card class="col-sm-3" v-for="page in pages" :key=page.id :img-src="image" img-alt="Image" img-top>
                                        <b-link href="#" class="card-link" @click="linkClick(page.id)">{{ page.pageNumber }}. Sayfa</b-link>
                                    </b-card>
                                </b-card-group>
                          </b-card-body>
                      </b-collapse>


<!--                      <ul class="swatch__container">-->
<!--                          <li v-for="page in pages" :key=page.id class="swatch__wrapper">-->
<!--                              <div class="swatch">-->
<!--                                  <div  class="swatch__type">№ {{ page.pageNumber }}. {{ page.pageNumber }}</div>-->
<!--                                  <div class="swatch__hex">{{ page.pageNumber }}</div>-->
<!--                                  <div  class="swatch__name">{{ page.pageNumber }}</div>-->
<!--                              </div>-->
<!--                          </li>-->
<!--                      </ul>-->
                  </b-card>
              </b-col>
          </b-tab>
      </b-tabs>
  </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import image from "../../assets/images/NavbarImages/hasretNavbarImage.jpeg"

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
          this.pages = await NewspaperService.getPages(newspaperId);
      },

      async onChange(year) {
          this.getNewspapersByYear(year);
      },

      async onClick(newspaperId) {
          this.getPagesByNewspaperId(newspaperId);
      },

      async linkClick(pageId) {
          var params = {
              pageId: pageId
          };
          let routeData = this.$router.resolve({name: 'EmbeddedFile', query: params});
          window.open(routeData.href, '_blank');
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
  /*.swatch__container {*/
  /*    margin: 0;*/
  /*    padding: 0;*/
  /*    display: flex;*/
  /*    flex-wrap: wrap;*/
  /*    justify-content: space-between;*/
  /*}*/
  /*.swatch {*/
  /*    display: inline-block;*/
  /*    width: 100%;*/
  /*    height: 100px;*/
  /*    border-radius: 4px;*/
  /*    margin-bottom: 1em;*/
  /*    transition: background .3s ease;*/
  /*}*/
  /*.swatch__wrapper {*/
  /*    display: inline-block;*/
  /*    width: 25%;*/
  /*    list-style: none;*/
  /*    margin-bottom: 1.4em;*/
  /*}*/
  /*.swatch__hex {*/
  /*    text-transform: uppercase;*/
  /*    font-weight: 600;*/
  /*    letter-spacing: 1.5px;*/
  /*    padding: .3em 0 .2em .3em;*/
  /*}*/
  /*.swatch__name {*/
  /*    font-size: 11px;*/
  /*    color: #aaa;*/
  /*    padding-left: .5em;*/
  /*}*/
  /*.swatch__type {*/
  /*    font-size: 13px;*/
  /*    color: #aaa;*/
  /*    padding: 1.0em 0 .5em .5em;*/
  /*}*/
</style>
