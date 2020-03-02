<template>
    <div class="container">
        <h3>Get All</h3>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Adı</th>
                    <th>Soyadı</th>
                    <th>İl</th>
                    <th>İlçe</th>
                    <th>Adres</th>
                    <th>Notlar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="abone in aboneler" v-bind:key="abone.id">
                    <td>{{abone.adi}}</td>
                    <td>{{abone.soyadi}}</td>
                    <td>{{abone.il}}</td>
                    <td>{{abone.ilce}}</td>
                    <td>{{abone.adres}}</td>
                    <td>{{abone.notlar}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import AboneDataService from '../service/AboneDataService';
    export default {
        name: "AbonelerList",
        data() {
            return {
                aboneler: [],
                message: null,
                INSTRUCTOR: "Project - X"
            };
        },
        methods: {
            refreshCourses() {
                AboneDataService.list({})
                    .then(response => {
                        this.aboneler = response.data;
                    });
            }
        },
        created() {
            this.refreshCourses();
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        max-width: 100%;
    }
</style>
