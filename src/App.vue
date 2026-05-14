<template>
    <div id="app">
        <nav-bar></nav-bar>

        <!-- Single Global Player -->
        <div v-show="isPlayerVisible"
             :class="['gp-wrapper', isMainPage ? 'gp-wrapper-full' : 'gp-wrapper-mini']">
            <MiniAudioPlayer
                :video-ids="videoIds"
                :mini="!isMainPage"
                @close="onPlayerClose"
                ref="globalPlayer"
            />
        </div>

        <div id='router-view' :style="{ paddingBottom: routerViewPadding }">
            <notifications></notifications>
            <keep-alive :include=this.isCached>
                <router-view/>
            </keep-alive>
        </div>

        <div id='footer-view' class="text-center" :style="{ bottom: footerBottom }">
            <b-img-lazy v-bind="mainProps" style="margin: 0 2.5px 0 0; cursor: pointer;"
                    :src="require('./assets/images/FooterImages/facebook.png')"
                    onclick="window.open('https://www.facebook.com/hasret.kemaliye','facebook')" ></b-img-lazy>
            <b-img-lazy v-bind="mainProps" style="margin: 0 2.5px 0 2.5px; cursor: pointer;"
                    :src="require('./assets/images/FooterImages/x.png')"
                    onclick="window.open('https://x.com/HasretKemaliye','twitter')" ></b-img-lazy>
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
    import MiniAudioPlayer from "./components/MiniAudioPlayer";

    export default {
        name: "app",
        components: { MiniAudioPlayer },
        data() {
            return {
                mainProps: {
                    blank: true,
                    width:30,
                    height:30
                },
                isCached : ["MainPage" ,"Newspapers"],
                videoIds: [
                    'k3qOmFZ0Ejw',
                    'G0mPZg-vafU',
                    'T1UDYFDm3Yw',
                    'ZBmDQziiO6s',
                    'yOakkqHmc8k',
                    'oQkMqVxpboM',
                    'yFRIYoETQb0',
                    '1wVn5xDCQ5Q',
                    'LZKWRydNQyw',
                    'j5bMP1VzvHk',
                    'gulxaOc2Q7M',
                    'Zt99cpGEkqg'
                ],
                playerClosedByUser: false
            }
        },
        computed: {
            isMainPage() {
                return this.$route && this.$route.name === 'mainPage';
            },
            isPlayerVisible() {
                if (this.isMainPage) return true;
                return !this.playerClosedByUser;
            },
            showMiniBar() {
                return this.isPlayerVisible && !this.isMainPage;
            },
            routerViewPadding() {
                if (this.showMiniBar) {
                    return '152px';
                }
                return '100px';
            },
            footerBottom() {
                return '0px';
            }
        },
        methods: {
            onPlayerClose() {
                this.playerClosedByUser = true;
                if (this.$refs.globalPlayer) {
                    this.$refs.globalPlayer.pauseVideo();
                }
            }
        },
        watch: {
            isMainPage(val) {
                if (val) {
                    this.playerClosedByUser = false;
                }
            }
        }
    };
</script>
<style>
    html, body {
        background-color: #F2F3F4;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        background-color: #F2F3F4;
        min-height: 100vh;
    }

    #router-view {
        padding: 20px 0 100px;
        margin: 0 auto;
        transition: padding-bottom 0.3s ease;
    }

    #footer-view {
        vertical-align: middle;
        background: #ec1b24;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80px;
        padding: 15px;
        z-index: 1000;
    }

    /* Global Player wrapper positioning */
    .gp-wrapper-full {
        position: fixed;
        top: 130px;
        left: 30px;
        width: calc(50% - 45px);
        z-index: 100;
        padding: 0;
    }

    .gp-wrapper-mini {
        position: fixed;
        bottom: 80px;
        left: 0;
        width: 100%;
        z-index: 10001;
    }

    @media only screen and (max-width: 768px) {
        .gp-wrapper-full {
            position: static;
            width: 100%;
            padding: 0 15px;
            margin: 10px auto;
        }
    }
</style>
