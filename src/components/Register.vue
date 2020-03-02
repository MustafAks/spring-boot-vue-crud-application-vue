<template>
    <div class="container">
        <div class="center">
            <b-container fluid>
                <b-row>
                    <b-col sm="4">
                        <label>Adı:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="adi"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Soyadı:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="soyadi"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Başlangıç Tarihi:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="baslangicTarihi"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Bitiş Tarihi:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="bitisTarihi"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>İl:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="il"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>İlçe:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="ilce"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Adres:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="adres"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Notlar:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="notlar"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Para Alındı:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-checkbox id="checkbox-1" name="checkbox-1" v-model="paraAlindi" value=true unchecked-value=false></b-form-checkbox>
                    </b-col>
                </b-row>
                <b-container class="bv-example-row">
                    <b-row align-h="end">
                        <b-col cols="3">
                            <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="submit()">Kayıt</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>
        </div>
    </div>
</template>
<script>
    import AboneDataService from '../service/AboneDataService';

    export default {
        data() {
            return {
                adi: '',
                soyadi: '',
                baslangicTarihi: '',
                bitisTarihi: '',
                il: '',
                ilce: '',
                adres: '',
                notlar: '',
                paraAlindi: ''
            }
        },
        methods: {
            submit() {
                AboneDataService.saveAbone({
                    adi: this.adi,
                    soyadi: this.soyadi,
                    baslangicTarihi: this.baslangicTarihi,
                    bitisTarihi: this.bitisTarihi,
                    il: this.il,
                    ilce: this.ilce,
                    adres: this.adres,
                    notlar: this.notlar,
                    paraAlindi: this.paraAlindi
                })
            },
        },
    }
</script>
