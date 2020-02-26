<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id='router-view'>
            <router-view/>
        </div>
        <div id='footer-view'>
            <!-- Footer -->
            <footer class="page-footer font-small mdb-color darken-3 pt-4">
                <!-- Footer Elements -->
                <div class="container">
                    <!--Grid row-->
                    <div class="row d-flex justify-content-center">
                        <!--Grid column-->
                        <div class="col-md-6">
                            <!-- Video -->
                            <div class="embed-responsive embed-responsive-16by9 mb-4">
                                <iframe width="200" height="200" src="https://www.youtube.com/embed/ooAJQC3B2VE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                        <!--Grid column-->
                    </div>
                    <!--Grid row-->
                </div>
                <!-- Footer Elements -->
                <!-- Copyright -->
                <div class="container">
                    <p class="text-center text-white">©{{ new Date().getFullYear() }} Copyright — Kemaliye</p>
                </div>
                <!-- Copyright -->
            </footer>
            <!-- Footer -->
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
        padding: 0px 0px;
        margin: 0 auto;
        vertical-align: middle;
        background: #263238;
    }

</style>
