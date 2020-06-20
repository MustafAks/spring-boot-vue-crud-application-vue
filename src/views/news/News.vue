<template>
    <div class="center">
        <h1 style="margin: 10px 0 0 0">{{ news.title }}</h1>
        <h3 style="margin: 20px 0 20px 0">{{ news.description }}</h3>
        <img :src="'data:image/jpg;base64,'+news.image" class="center"/>
        <p style="margin: 30px 0 0 0">
            {{ news.news }}
        </p>
    </div>
</template>

<script>

    import NewsService from "../../service/NewsService";

    export default {
        data: function () {
            return {
                id: this.$route.query.newsId,
                news: {
                    id: null,
                    title: null,
                    description: null,
                    news: null,
                    image: null
                }
            }
        },

        methods: {
            async loadNews() {
                this.news = await NewsService.getNews(this.id);
            }
        },
        beforeMount() {
            this.loadNews();
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
