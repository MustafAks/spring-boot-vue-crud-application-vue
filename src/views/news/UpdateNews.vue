<template>
    <div class="container">
        <b-form @submit="updateNews">
            <b-row>
                <b-col class="col-6">
                    <b-form-group
                            id="input-group-1"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Başlık :"
                            label-for="title"
                    >
                        <b-form-input
                                id="title"
                                v-model="news.title"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="input-group-2"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Açıklama :"
                            label-for="description"
                    >
                        <b-form-input
                                id="description"
                                v-model="news.description"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="input-group-3"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="İçerik :"
                            label-for="news"
                    >

                        <b-form-textarea
                                id="news"
                                v-model="news.news"
                                rows="5"
                                required
                        ></b-form-textarea>
                    </b-form-group>
                    <b-row align-h="end">
                        <b-button type="submit" variant="success">
                            <b-icon icon="plus"></b-icon>
                            Kaydet
                        </b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>
<script>
    import NewsService from '../../service/NewsService';

    export default {
        name: "updateNews",
        data() {
            return {
                news: {
                    id: this.$route.params.id,
                    title: this.$route.params.title,
                    description: this.$route.params.description,
                    news: this.$route.params.news
                }
            };
        },
        methods: {
            async updateNews() {
                if (this.news.title === undefined || this.news.title === null || this.news.title === '') {
                    this.$errorNotification(this, 'Lütfen başlık değerini giriniz !');
                    return;
                }
                if (this.news.description === undefined || this.news.description === null || this.news.description === '') {
                    this.$errorNotification(this, 'Lütfen açıklama değerini giriniz !');
                    return;
                }
                if (this.news.news === undefined || this.news.news === null || this.news.news === '') {
                    this.$errorNotification(this, 'Lütfen içerik değerini giriniz !');
                    return;
                }

                await NewsService.saveNews(this.news);
                this.$notification(this, 'Haber başarılı bir şekilde güncellendi.');
                // if success
                this.$router.push({name: 'NewsList'});
            }
        },
        beforeMount() {
            if (this.news.id === undefined || this.news.id === null || this.news.id === '') {
                this.$router.push({name: 'NewsList'});
            }
        }
    };
</script>
<style>
    img {
        max-width: 100%;
    }
</style>
