<template>
  <div class="container">
      <b-tabs content-class="mt-3">
          <b-tab v-for="year in years" :key=year :title=year.toString() @click="onChange(year)">
              <b-col>
                  <b-button v-for="newspaper in newspapers" :key=newspaper.id v-b-toggle.collapse-1 variant="primary" @click="onClick(newspaper.id)">
                      {{ newspaper.title }}
                  </b-button>
                  <b-collapse id="collapse-1" class="mt-2">
                      <b-card-group deck>
                          <b-card class="col-sm-3" v-for="page in pages" :key=page.id :img-src="image" img-alt="Image" img-top>
                              <b-link href="#" class="card-link" @click="linkClick(page.id)">{{ page.pageNumber }}. Sayfa</b-link>
                          </b-card>
                      </b-card-group>
                  </b-collapse>
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
</style>
