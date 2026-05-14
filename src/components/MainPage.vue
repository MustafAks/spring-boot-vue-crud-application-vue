<template>
    <div class="container-fluid">
        <!-- Loading Overlay -->
        <loading-overlay :show="loading" />

        <div v-if="!loading" class="mainpage-content">
            <div class="ad-col">
                <div v-if="advertisements.length > 0" class="ad-carousel-wrapper">
                    <b-carousel
                            id="myCarousel"
                            v-model="slide"
                            :interval="4000"
                            controls
                            indicators
                            background="#f5f5f5"
                    >
                        <b-carousel-slide
                                v-for="advertisement in advertisements"
                                :key="advertisement.id"
                        >
                            <template v-slot:img>
                                <div class="ad-slide">
                                    <img
                                            :src="'data:image/jpg;base64,' + advertisement.image"
                                            alt="Reklam"
                                            class="ad-image"
                                    />
                                </div>
                            </template>
                        </b-carousel-slide>
                    </b-carousel>
                </div>
                <div v-else class="ad-placeholder text-center text-muted">
                    <b-icon icon="image" font-scale="3"></b-icon>
                    <p>Reklam bulunmamaktadır</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdvertisementService from "../service/AdvertisementService";
    import LoadingOverlay from "../components/LoadingOverlay";

    export default {
        name : 'MainPage',
        components: { LoadingOverlay },
        data: function () {
            return {
                slide: 0,
                advertisements: [],
                loading: true
            }
        },


        methods: {
            async listAdvertisements() {
                try {
                    this.loading = true;
                    this.advertisements = await AdvertisementService.list();
                } finally {
                    this.loading = false;
                }
            }
        },
        beforeMount() {
            this.listAdvertisements();
        }
    }
</script>


<style scoped>
    .container-fluid {
        display: block;
        padding-right: 15px;
        padding-left: 15px;
        list-style: none;
        position: relative;
    }

    .mainpage-content {
        display: flex;
        justify-content: flex-end;
    }

    .ad-col {
        width: 50%;
        padding-top: 10px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .ad-carousel-wrapper {
        position: sticky;
        top: 130px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        width: 90%;
        max-width: 500px;
    }

    .ad-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        width: 100%;
        min-height: 480px;
        padding: 15px;
    }

    .ad-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .ad-placeholder {
        margin-top: 80px;
        padding: 40px 20px;
        background: #f9f9f9;
        border-radius: 8px;
        width: 80%;
        max-width: 420px;
    }

    @media only screen and (max-width: 768px) {
        .mainpage-content {
            flex-direction: column;
        }

        .ad-col {
            width: 100%;
            margin-top: 20px;
        }

        .ad-carousel-wrapper {
            position: static;
        }
    }
</style>
