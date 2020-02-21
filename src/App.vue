<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id='router-view'>
            <router-view/>
        </div>
        <v-footer></v-footer>
    </div>

</template>
<script>

    export default {
        name: "app"
    };
</script>
<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #router-view {
        padding: 20px 0px;
        margin: 0 auto;
    }
</style>