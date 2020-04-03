
<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id='router-view'>
            <notifications></notifications>
            <router-view/>
        </div>
        <div id='footer-view' class="text-center">
            <b-img-lazy v-bind="mainProps"
                    :src="require('./assets/images/FooterImages/facebook.png')"
                    onclick="window.open('https://www.facebook.com/hasret.kemaliye','facebook','toolbar=yes,scrollbars=yes,resizable=yes,width=4000,height=4000,top=500,left=500')" ></b-img-lazy>
            <b-img-lazy v-bind="mainProps"
                    :src="require('./assets/images/FooterImages/twitter.png')"
                    onclick="window.open('https://twitter.com/HasretKemaliye','twitter','toolbar=yes,scrollbars=yes,resizable=yes,width=4000,height=4000,top=500,left=500')" ></b-img-lazy>
            <b-img-lazy v-bind="mainProps"
                    :src="require('./assets/images/FooterImages/instagram.png')"
                    onclick="window.open('https://www.instagram.com/hasretgazetesi/','instagram','toolbar=yes,scrollbars=yes,resizable=yes,width=4000,height=4000,top=500,left=500')" ></b-img-lazy>
          <div class="container">
                <p class="text-center text-white">©{{ new Date().getFullYear() }} Copyright — Kemaliye</p>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                mainProps: {
                    blank: true,
                    width:30,
                    height:30
                }
            }
        }
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
        height: 80px;
        padding:15px;
    }

</style>
