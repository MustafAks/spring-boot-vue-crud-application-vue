<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>
            <img :src="require('../assets/images/NavbarImages/hasretNavbarImage.jpeg')" id='logo'>
        </b-navbar-brand>
        <b-navbar-toggle target="nav_ collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'mainPage'}" :active="$route.name == 'mainPage'">Anasayfa</b-nav-item>
                <b-nav-item :to="{ name: 'Newspapers'}" :active="$route.name == 'Newspapers'">Gazeteler</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{ name: 'AdminPanel'}" :active="$route.name == 'AdminPanel'">Admin Paneli</b-nav-item>
                <b-nav-item :to="{ name: 'UserProfile'}" :active="$route.name == 'UserProfile'">Profil</b-nav-item>
                <b-nav-item :to="{ name: 'Contact'}" :active="$route.name == 'Contact'">İletişim</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
    export default {
        name: "nav-bar",
        data() {
            return {

            };
        },
        methods: {
            async redirectMainPage() {
                this.$router.push({ name: 'mainPage'});
            }

        },
        beforeMount() {

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
