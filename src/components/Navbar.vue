<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <!--  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>-->
        <b-navbar-brand>
          <!--  <img :src="require('../assets/hasret.jpeg')" id='logo'>-->
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'latest'}" :active="$route.name == 'latest'">Anasayfa</b-nav-item>
                <b-nav-item :to="{ name: 'SubscriberList'}" :active="$route.name == 'SubscriberList'">Aboneler</b-nav-item>
                <b-nav-item :to="{ name: 'FilterList'}" :active="$route.name == 'FilterList'">Filtrele</b-nav-item>
<!--
                <b-nav-item :to="{ name: 'random'}" :active="$route.name.includes('random')">Random</b-nav-item>
-->
<!--
                <b-nav-item :to="{ name: 'search'}" :active="$route.name.includes('search')">Search</b-nav-item>
-->
             <!--   <b-nav-item-dropdown text="Categories" right>
                    <b-dropdown-item v-for="(cat, index) in categories" :active="$route.path.includes(`search/category/${cat.strCategory}`)" :key='index' :to="`/search/category/${cat.strCategory}`">
                        {{cat.strCategory}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>-->
  <!--              <b-nav-item-dropdown text="Areas" right>
                    <b-dropdown-item v-for="(area, index) in areas" :active="$route.path.includes(`search/area/${area.strArea}`)" :key='index' :to="`/search/area/${area.strArea}`">
                        {{area.strArea}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>-->
            </b-navbar-nav>
            <!-- Right aligned nav items -->
          <!--  <b-navbar-nav class="ml-auto">
                <b-nav-form @submit="search">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" name='keyword' v-model="keyword" v-validate="'required'" />
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
            </b-navbar-nav>-->
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{ name: 'Register'}" :active="$route.name == 'Register'">Kayıt Ol</b-nav-item>
                <b-nav-item :to="{ name: 'AboutUs'}" :active="$route.name == 'Register'">Hakkımızda</b-nav-item>
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
