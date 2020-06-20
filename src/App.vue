<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id='router-view'>
            <notifications></notifications>
            <keep-alive :include=this.isCached>
                <router-view/>
            </keep-alive>
        </div>
        <div id='footer-view' class="text-center">
            <b-img-lazy v-bind="mainProps" style="margin: 0 2.5px 0 0; cursor: pointer;"
                    :src="require('./assets/images/FooterImages/facebook.png')"
                    onclick="window.open('https://www.facebook.com/hasret.kemaliye','facebook')" ></b-img-lazy>
            <b-img-lazy v-bind="mainProps" style="margin: 0 2.5px 0 2.5px; cursor: pointer;"
                    :src="require('./assets/images/FooterImages/twitter.png')"
                    onclick="window.open('https://twitter.com/HasretKemaliye','twitter')" ></b-img-lazy>
            <b-img-lazy v-bind="mainProps" style="margin: 0 0 0 2.5px; cursor: pointer;"
                    :src="require('./assets/images/FooterImages/instagram.png')"
                    onclick="window.open('https://www.instagram.com/hasretgazetesi/','instagram')" ></b-img-lazy>
          <div class="container">
                <p class="text-center text-white">©{{ new Date().getFullYear() }} Copyright — Kemaliye Hasret Gazetesi</p>
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
                },
                isCached : ["MainPage" ,"Newspapers"]
            }
        }
    };
</script>
<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        background-color: #F2F3F4;
    }

    #router-view {
        padding: 20px 0px 100px;
        margin: 0 auto;
    }

    #footer-view {
        vertical-align: middle;
        background: #ec1b24;
        position:fixed;
        left: 0px;
        bottom:0;
        width: 100%;
        height: 80px;
        padding:15px;
    }

</style>
