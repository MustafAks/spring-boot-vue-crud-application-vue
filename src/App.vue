<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id='router-view'>
            <notifications></notifications>
            <router-view/>
        </div>
        <div id='footer-view'>
            <div class="container">
                <p class="text-center text-white">©{{ new Date().getFullYear() }} Copyright — Kemaliye</p>
            </div>
        </div>
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

    #footer-view {
        vertical-align: middle;
        background: #263238;
        position:fixed;
        left: 0px;
        bottom:0;
        width: 100%;
        height: 50px;
        padding:15px;
    }

</style>
