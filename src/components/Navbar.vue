<template>
    <div>
        <b-navbar toggleable="md" style="background-color: #ec1b24;" type="dark">
            <b-navbar-brand>
                <img :src="require('../assets/images/NavbarImages/hasretNavbarImage.jpeg')" id='logo'>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'mainPage'}" :active="$route.name == 'mainPage'">Anasayfa</b-nav-item>
                    <b-nav-item :hidden="this.$store.state.userRole !== 'ROLE_ADMIN' && this.$store.state.userRole !== 'ROLE_USER'" :to="{ name: 'Newspapers'}" :active="$route.name == 'Newspapers'">Gazeteler</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item :hidden="this.$store.state.userRole !== null" :to="{ name: 'login'}" :active="$route.name == 'login'">Giriş Yap</b-nav-item>
                    <b-nav-item-dropdown text="Profil" :hidden="this.$store.state.userRole === null">
                        <b-dropdown-item :hidden="this.$store.state.userRole !== 'ROLE_USER'" :to="{ name: 'UserProfile'}" :active="$route.name == 'UserProfile'">Profil</b-dropdown-item>
                        <b-dropdown-item :hidden="this.$store.state.userRole !== 'ROLE_ADMIN'" :to="{ name: 'AdminPanel'}" :active="$route.name == 'AdminPanel'">Admin Paneli</b-dropdown-item>
                        <b-dropdown-item :hidden="this.$store.state.userRole === null" @click="logout()">Çıkış Yap</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item :to="{ name: 'Contact'}" :active="$route.name == 'Contact'">İletişim</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
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
                if (this.$route.name !== 'mainPage') {
                    this.$router.push({ name: 'mainPage'});
                }
            },

            async logout() {
                localStorage.removeItem("user");
                this.$store.commit('logout');
                this.redirectMainPage();
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
