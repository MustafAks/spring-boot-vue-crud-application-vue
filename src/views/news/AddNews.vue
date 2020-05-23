<template>
    <div class="container">
        <b-form @submit="createNews" @reset="clear">
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
                        <b-button type="reset" variant="primary" style="margin-left: 5px">Temizle</b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>

    import NewsService from "../../service/NewsService";

    export default {
        data() {
            return {
                news: {
                    title: null,
                    description: null,
                    news: null
                }
            }
        },

        methods: {
            async createNews() {
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
                const data = JSON.parse(JSON.stringify(this.news));
                await NewsService.saveNews(data);
                this.$notification(this, 'Haber başarılı bir şekilde kayıt edildi.');
                this.$router.push({name: 'NewsList'});
            },

            clear() {
                // Reset our form values
                this.news.title = '';
                this.news.description = '';
                this.news.news = '';
            }
        },
        beforeMount() {
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
