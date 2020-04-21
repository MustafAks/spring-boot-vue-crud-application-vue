<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>
            <img :src="require('../assets/images/NavbarImages/hasretNavbarImage.jpeg')" id='logo'>
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'mainPage'}" :active="$route.name == 'mainPage'">Anasayfa</b-nav-item>
                <b-nav-item :to="{ name: 'Newspapers'}" :active="$route.name == 'Newspapers'">Gazeteler</b-nav-item>
                <b-nav-item :to="{ name: 'FilterList'}" :active="$route.name == 'FilterList'">Filtrele</b-nav-item>
                <b-nav-item :to="{ name: 'SubscriberEndDateControl'}" :active="$route.name == 'SubscriberEndDateControl'">Abonelik Bitiş Sorgulama</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{ name: 'Register'}" :active="$route.name == 'Register'">Abone Ekle</b-nav-item>
                <b-nav-item :to="{ name: 'AddNewspaper'}" :active="$route.name == 'AddNewspaper'">Gazete Ekle</b-nav-item>
                <b-nav-item :to="{ name: 'Parameters'}" :active="$route.name == 'Parameters'">Parametreler</b-nav-item>
                <b-nav-item :to="{ name: 'Contact'}" :active="$route.name == 'Contact'">İletişim</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    export default {
        name: "nav-bar",
        data() {
            return {
                keyword: "",
                categories: [],
                areas: [],
                ingredients: []
            };
        },
        methods: {
            search(evt) {
                evt.preventDefault();
                if (this.errors.any()){
                    return;
                }
                this.$router.push({
                    name: 'search-keyword',
                    params: {
                        keyword: this.keyword
                    }
                });
            }
        },
        beforeMount() {
            request.get(`${APIURL}categories`).end((err, res) => {
                this.categories = res.body.meals;
            });
            request.get(`${APIURL}area`).end((err, res) => {
                this.areas = res.body.meals;
            });
            request.get(`${APIURL}ingredients`).end((err, res) => {
                this.ingredients = res.body.meals;
            });
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #logo {
        width: 150px;
        height: 80px;
        margin-top: -3px;
    }
</style>
