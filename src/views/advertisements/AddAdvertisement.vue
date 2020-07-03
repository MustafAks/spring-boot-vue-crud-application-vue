<template>
    <div class="container">
        <b-form @submit=createAdvertisement @reset="clear">
            <b-row>
                <b-col class="col-6">
                    <b-form-group
                            id="input-group-1"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Açıklama :"
                            label-for="description"
                    >
                        <b-form-input
                                id="description"
                                v-model="advertisement.description"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="input-group-2"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Başlangıç Tarihi :"
                            label-for="startDate"
                    >
                        <b-form-datepicker
                                id="startDate"
                                v-model="advertisement.startDate"
                                dark
                                placeholder="Seçiniz"
                                today-button label-today-button="Bugün"
                                reset-button label-reset-button="Sil"
                                close-button label-close-button="Kapat"
                                :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="tr"
                                aria-required="true"
                                required
                        ></b-form-datepicker>
                    </b-form-group>
                    <b-form-group
                            id="input-group-3"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Bitiş Tarihi :"
                            label-for="endDate"
                    >
                        <b-form-datepicker
                                id="endDate"
                                v-model="advertisement.endDate"
                                dark
                                placeholder="Seçiniz"
                                today-button label-today-button="Bugün"
                                reset-button label-reset-button="Sil"
                                close-button label-close-button="Kapat"
                                :dateFormatOptions="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="tr"
                                aria-required="true"
                                required
                        ></b-form-datepicker>
                    </b-form-group>
                    <b-form-group
                            id="input-group-4"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Fotoğraf Ekle :"
                            label-for="image"
                    >
                        <b-form-file id="image"
                                     v-model="advertisement.image"
                                     class="mt-3"
                                     plain
                                     required
                        >
                        </b-form-file>
                    </b-form-group>

                    <label>Not: Fotoğraf boyutu 1024x480 olursa daha ekranda daha güzel görünür.</label>

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

    import AdvertisementService from "../../service/AdvertisementService";
    import DateConverterUtils from "../../utils/DateConverterUtils";

    export default {
        data() {
            return {
                advertisement: {
                    description: null,
                    startDate: null,
                    endDate: null,
                    image: null
                }
            }
        },

        methods: {
            async createAdvertisement() {
                if (this.advertisement.description === undefined || this.advertisement.description === null || this.advertisement.description === '') {
                    this.$errorNotification(this, 'Lütfen açıklama değerini giriniz !');
                    return;
                }
                if (this.advertisement.startDate === undefined || this.advertisement.startDate === null || this.advertisement.startDate === '') {
                    this.$errorNotification(this, 'Lütfen başlangıç tarihi değerini giriniz !');
                    return;
                }
                if (this.advertisement.endDate === undefined || this.advertisement.endDate === null || this.advertisement.endDate === '') {
                    this.$errorNotification(this, 'Lütfen bitiş tarihi değerini giriniz !');
                    return;
                }
                if (this.advertisement.image === undefined || this.advertisement.image === null || this.advertisement.image === '') {
                    this.$errorNotification(this, 'Lütfen fotoğraf ekleyiniz !');
                    return;
                }
                const fileFromPage = this.advertisement.image;
                let formData = new FormData();
                formData.append('file', fileFromPage);
                formData.append('description', this.advertisement.description);
                formData.append('startDate', DateConverterUtils.convertDateToTimestamp(this.advertisement.startDate).toString());
                formData.append('endDate', DateConverterUtils.convertDateToTimestamp(this.advertisement.endDate).toString());
                await AdvertisementService.saveAdvertisement(formData);
                this.$notification(this, 'Reklam başarılı bir şekilde kayıt edildi.');
                this.$router.push({name: 'AdvertisementsList'});
            },

            clear() {
                // Reset our form values
                this.advertisement.description = null;
                this.advertisement.startDate = null;
                this.advertisement.endDate = null;
                this.advertisement.image = null;
            }
        },
        beforeMount() {
        }
    }
</script>
<style>
</style>
