<template>
    <div class="container">
        <div class="center">
            <b-container fluid>
                <b-row>
                    <b-col sm="4">
                        <label>İmtiyaz Sahibi ve Genel Yayın Yönetmeni:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.licensee"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Sorumlu Yazı İşleri Müdürü:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.boss"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>İrtibat Telefonu:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.contactNumber"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>E-Mail Adresi:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.emailAddress"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Facebook Linki:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.facebookLink"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Twitter Linki:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.twitterLink"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Instagram Linki:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="parameters.instagramLink"></b-form-input>
                    </b-col>
                </b-row>
                <b-container class="bv-example-row">
                    <b-row align-h="end">
                        <b-col cols="3">
                            <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="save()">Kaydet</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>
        </div>
    </div>
</template>

<script>
    import ParameterService from "../service/ParameterService";

    export default {
        name: "parameters",
        data() {
            return {
                parameters: {
                    licensee: null,
                    boss: null,
                    contactNumber: null,
                    emailAddress: null,
                    facebookLink: null,
                    twitterLink: null,
                    instagramLink: null
                }
            };
        },
        methods: {
            async save() {
                await ParameterService.saveParameters(this.parameters);
                this.$notification(this, 'Parametreler başarılı bir şekilde kayıt edildi.');
            },

            async getParameters() {
                this.parameters = await ParameterService.getParameters();
            },
        },
        beforeMount() {
            this.getParameters();
        }
    };
</script>
<style>
</style>
