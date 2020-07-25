<template>
    <div class="container">
        <b-row>
            <b-col class="col-8">
                <b-overlay :show="show" rounded="sm">
                    <h1>Son Eklenenler</h1>
                    <label v-if = "this.news === undefined || this.news === null || this.news.length === 0">Henüz Hiç Haber Eklenmemiş</label>
                    <li v-for="newsContent in news" :key=newsContent.id>
                        <b-card style="margin-top: 10px;">
                            <b-row>
                                <b-col md="3">
                                    <a :href="'#/news?newsId=' + newsContent.id">
                                        <b-card-img :src="'data:image/jpg;base64,'+newsContent.image" alt="Image" class="rounded-0"></b-card-img>
                                    </a>
                                </b-col>
                                <b-col md="9">
                                    <b-card-body>
                                        <a :href="'#/news?newsId=' + newsContent.id" style="text-decoration: none; color: black">
                                            <b-card-title>
                                                {{ newsContent.title }}
                                            </b-card-title>
                                        </a>
                                        <a :href="'#/news?newsId=' + newsContent.id" style="text-decoration: none; color: black">
                                            <b-card-text>
                                                {{ newsContent.description }}
                                            </b-card-text>
                                        </a>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </li>

                    <b-button variant="outline-primary" style="margin-top: 10px; width: 100%" @click = getNews() :hidden = buttonHidden>
                        Daha Fazla
                    </b-button>

                    <template v-slot:overlay>
                        <div class="text-center">
                            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                            <p id="cancel-label">Lütfen Bekleyin...</p>
                        </div>
                    </template>
                </b-overlay>
            </b-col>

            <b-col class="col-4">
                <b-carousel
                        id="advertisement"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        background="#ababab"
                        img-width="1024"
                        img-height="480"
                        style="text-shadow: 1px 1px 2px #333; position: fixed; margin-top: 50px"
                >
                    <li v-for="advertisement in advertisements" :key=advertisement.id>
                        <b-carousel-slide :img-src= "'data:image/jpg;base64,'+advertisement.image"></b-carousel-slide>
                    </li>
                </b-carousel>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import NewsService from "../service/NewsService";
    import AdvertisementService from "../service/AdvertisementService";

    const offset = 10;

    export default {
        name : 'MainPage',
        data: function () {
            return {
                news: [],
                newsCounter: 0,
                buttonHidden : false,
                show : true,
                slide: 0,
                advertisements: []
            }
        },

        mounted() {
            this.show = false;
        },

        methods: {
            async getInitialNews() {
                var data = {
                    firstIndex : 0,
                    offset : offset
                };
                this.news = await NewsService.listNewsForPublic(data);
                if (this.news !== undefined && this.news !== null) {
                    this.newsCounter = this.news.length;
                }
                if (this.news === undefined || this.news === null || this.news.length === 0) {
                    this.buttonHidden = true;
                }
            },

            async getNews() {
                var data = {
                    firstIndex : this.newsCounter,
                    offset : offset
                };
                let result = await NewsService.listNewsForPublic(data);
                if (result === undefined || result === null || result.length === 0) {
                    this.buttonHidden = true;
                }
                this.news = this.news.concat(result);
                if (this.news !== undefined && this.news !== null) {
                    this.newsCounter = this.news.length;
                }
            },

            async listAdvertisements() {
                this.advertisements = await AdvertisementService.list();
            }
        },
        beforeMount() {
            this.getInitialNews();
            this.listAdvertisements();
        }
    }
</script>


<style>
    .container {
        display: block;
        margin-left: auto;
        margin-right: auto;
        list-style: none
    }

    #advertisement {
        margin: 0 40px 0 40px;
    }
</style>
