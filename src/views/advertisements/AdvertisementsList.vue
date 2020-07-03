<template>
    <div class="container">
        <h3 align="center" style="margin-top: 50px">Reklamlar</h3>
        <div class="container" style="text-align: center">
            <b-table :fields="advertisementsFields" :items="advertisementsItems">
                <template v-slot:cell(operations)="row">
                    <b-button style="margin-left: 5px" variant="danger"
                              v-on:click.prevent="deleteAdvertisement(row.item.id)">
                        <b-icon icon="trash-fill"></b-icon>
                        Sil
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
    import AdvertisementService from "../../service/AdvertisementService";

    export default {
        data() {
            return {
                advertisementsItems: [],
                advertisementsFields: [
                    {key: 'description', label: 'Açıklama'},
                    {key: 'startDate', label: 'Başlangıç Tarihi'},
                    {key: 'endDate', label: 'Bitiş Tarihi'},
                    {key: 'operations', label: 'İşlemler'}
                ]
            }
        },

        methods: {
            async loadAdvertisements() {
                var result = await AdvertisementService.list();
                result.forEach(function (item) {
                    item.startDate = new Date(item.startDate).toLocaleDateString();
                    item.endDate = new Date(item.endDate).toLocaleDateString();
                });
                this.advertisementsItems = result;
            },

            async deleteAdvertisement(advertisementId) {
                await AdvertisementService.deleteAdvertisement(advertisementId);
                this.$notification(this, 'Reklam başarılı bir şekilde silindi.');
                await this.loadAdvertisements();
            }
        },
        beforeMount() {
            this.loadAdvertisements();
        }
    }
</script>
<style>
    img {
        max-width: 100%;
    }
</style>
