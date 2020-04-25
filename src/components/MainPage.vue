<template>
    <div id="app">
        <img :src="image" class="center"/>
    </div>
</template>

<script>
    import image from "../assets/images/MainPageImages/hasretMainPage.jpg"

    export default {
        data: function () {
            return {
                image: image
            }
        }
    }
</script>


<style lang="scss">
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
    }
</style>
