<template>
    <div class="container">
        <div class="center">
            <b-form @submit="createNewspaper" @reset="clear">
                <b-form-group
                        id="input-group-1"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Başlık :"
                        label-for="newspaperTitle"
                >
                    <b-form-input id="newspaperTitle" v-model="newspaper.title" required></b-form-input>
                </b-form-group>

                <b-form-group
                        id="input-group-2"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Sayı :"
                        label-for="newspaperIssue"
                >
                    <b-form-input id="newspaperIssue"
                                  v-model="newspaper.issue"
                                  type="number"
                                  :min=0
                                  required>
                    </b-form-input>
                </b-form-group>

                <b-form-group
                        id="input-group-3"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Yıl :"
                        label-for="newspaperYear"
                >
                    <b-form-input id="newspaperYear"
                                  v-model="newspaper.year"
                                  type="number"
                                  :min=2015
                                  required>

                    </b-form-input>
                </b-form-group>

                <b-row align-h="end">
                    <b-button type="submit" variant="success">
                        <b-icon icon="plus"></b-icon>
                        Ekle
                    </b-button>
                    <b-button type="reset" variant="primary" style="margin-left: 5px">Temizle</b-button>
                </b-row>
            </b-form>
        </div>
        <h3 align="center" style="margin-top: 50px">Gazeteler</h3>
        <div class="container" style="text-align: center">
            <b-table :fields="newspapersFields" :items="newspapersItems">
                <template v-slot:cell(operation)="row">
                    <b-button variant="success" v-on:click.prevent="redirectPages(row.item)">
                        <b-icon icon="layout-text-sidebar-reverse"></b-icon>
                        Sayfalar
                    </b-button>
                    <b-button style="margin-left: 5px" variant="danger"
                              v-on:click.prevent="deleteNewspaper(row.item.id)">
                        <b-icon icon="trash-fill"></b-icon>
                        Sil
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
    import NewspaperService from "../../service/NewspaperService";

    export default {
        data() {
            return {
                newspaper: {
                    title: '',
                    issue: '',
                    year: '',
                },
                newspapers: [],
                newspapersItems: [],
                newspapersFields: [
                    {key: 'title', label: 'Başlık'},
                    {key: 'issue', label: 'Sayı'},
                    {key: 'year', label: 'Yıl'},
                    {key: 'operation', label: 'İşlemler'}
                ]
            }
        },

        methods: {
            async createNewspaper() {
                if (this.newspaper.title === undefined || this.newspaper.title === null || this.newspaper.title === '') {
                    this.$errorNotification(this, 'Lütfen gazete başlığı giriniz !');
                    return;
                }
                if (this.newspaper.issue === undefined || this.newspaper.issue === null || this.newspaper.issue === '') {
                    this.$errorNotification(this, 'Lütfen sayı değerini giriniz !');
                    return;
                }
                if (this.newspaper.year === undefined || this.newspaper.year === null || this.newspaper.year === '') {
                    this.$errorNotification(this, 'Lütfen yıl değerini giriniz !');
                    return;
                }
                await NewspaperService.saveNewspaper(this.newspaper);
                this.$notification(this, 'Gazete başarılı bir şekilde kayıt edildi.');
                this.clear();

                this.loadNewspapers();
            },

            async deleteNewspaper(newspaperId) {
                await NewspaperService.deleteNewspaper(newspaperId);
                this.$notification(this, 'Gazete başarılı bir şekilde silindi.');
                // if success
                this.loadNewspapers();
            },

            async loadNewspapers() {
                this.newspapersItems = await NewspaperService.list();
            },

            redirectPages(params) {
                this.$router.push({name: 'AddPages', params: params});
            },

            clear() {
                // Reset our form values
                this.newspaper.id = '';
                this.newspaper.title = '';
                this.newspaper.issue = '';
                this.newspaper.year = '';
            }
        },
        beforeMount() {
            this.loadNewspapers();
        }
    }
</script>
<style>
    img {
        max-width: 100%;
    }
</style>
