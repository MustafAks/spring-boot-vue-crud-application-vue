<template>
    <div class="center">
        <li v-for="newsContent in news" :key=newsContent.id>
            <b-card>
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
    </div>
</template>

<script>
    import image from "../assets/images/NavbarImages/hasretNavbarImage.jpeg"
    import NewsService from "../service/NewsService";

    export default {
        data: function () {
            return {
                image: image,
                news: []
            }
        },

        methods: {
            async getInitialNews() {
                this.news = await NewsService.list({});
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
