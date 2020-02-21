<template>
    <div id="app">
        <img :src="image" class="center"/>
    </div>
</template>

<script>
    import image from "../assets/hasret.jpg"


    export default {
        data: function () {
            return {
                mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' },
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
        width: 50%;
    }
</style>