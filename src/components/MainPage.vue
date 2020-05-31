<template>
    <div class="center">
        <h1>Son Eklenenler</h1>
        <label v-if = "this.news === undefined || this.news === null || this.news.length === 0">Henüz Hiç Haber Eklenmemiş</label>
        <li v-for="newsContent in news" :key=newsContent.id>
            <b-card style="margin-top: 10px;">
                <b-row>
                    <b-col md="3">
                            <router-link :to="{ name: 'News', params: newsContent }">
                                <b-card-img :src="'data:image/jpg;base64,'+newsContent.image" alt="Image" class="rounded-0"></b-card-img>
                            </router-link>
                    </b-col>
                    <b-col md="9">
                        <b-card-body>
                            <router-link :to="{ name: 'News', params: newsContent }" style="text-decoration: none; color: black">
                                <b-card-title>
                                    {{ newsContent.title }}
                                </b-card-title>
                            </router-link>
                            <b-card-text>
                                {{ newsContent.description }}
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </li>

        <b-button variant="outline-primary" style="margin-top: 10px; width: 100%" @click = getNews() :hidden = buttonHidden>
            Daha Fazla
        </b-button>

    </div>
</template>

<script>
    import NewsService from "../service/NewsService";

    const offset = 10;

    export default {
        data: function () {
            return {
                news: [],
                newsCounter: 0,
                buttonHidden : false
            }
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
            }
        },
        beforeMount() {
            this.getInitialNews();
        }
    }
</script>


<style>
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
        list-style: none
    }
</style>
