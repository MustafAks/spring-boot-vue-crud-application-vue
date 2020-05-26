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
                    <b-form-group
                            id="input-group-4"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Fotoğraf Ekle :"
                            label-for="image"
                    >
                        <b-form-file id="image"
                                     v-model="news.image"
                                     class="mt-3"
                                     plain
                                     required
                        >
                        </b-form-file>
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
                    news: null,
                    image: null
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
                if (this.news.image === undefined || this.news.image === null || this.news.image === '') {
                    this.$errorNotification(this, 'Lütfen fotoğraf ekleyiniz !');
                    return;
                }
                const fileFromPage = this.news.image;
                let formData = new FormData();
                formData.append('file', fileFromPage);
                formData.append('id', null);
                formData.append('title', this.news.title);
                formData.append('description', this.news.description);
                formData.append('news', this.news.news);
                await NewsService.saveNews(formData);
                this.$notification(this, 'Haber başarılı bir şekilde kayıt edildi.');
                this.$router.push({name: 'NewsList'});
            },

            clear() {
                // Reset our form values
                this.news.id = null;
                this.news.title = null;
                this.news.description = null;
                this.news.news = null;
                this.news.image = null;
            }
        },
        beforeMount() {
        }
    }
</script>
<style>
</style>
