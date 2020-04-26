<template>
    <div class="container">
        <h2>Abonelik İşlemleri</h2>
        <div class="separator"></div>
        <li v-for="subscriptionsOperation in subscriptionsOperations" :key=subscriptionsOperation.name
            class="swatch__wrapper" style="text-align:center">
            <b-card img-alt="Image" img-left>
                <div @click="redirect(subscriptionsOperation.name)">
                    <img :src=subscriptionsOperation.image>
                    <b-link>{{ subscriptionsOperation.title }}</b-link>
                </div>
            </b-card>
        </li>

        <h2>Gazete İşlemleri</h2>
        <div class="separator"></div>
        <li v-for="newspapersOperation in newspapersOperations" :key=newspapersOperation.name
            class="swatch__wrapper" style="text-align:center">
            <b-card img-alt="Image" img-left>
                <div @click="redirect(newspapersOperation.name)">
                    <img :src=newspapersOperation.image>
                    <b-link>{{ newspapersOperation.title }}</b-link>
                </div>
            </b-card>
        </li>

        <h2>Mesajlar</h2>
        <div class="separator"></div>
        <li v-for="messagesOperation in messagesOperations" :key=messagesOperation.name
            class="swatch__wrapper" style="text-align:center">
            <b-card img-alt="Image" img-left>
                <div @click="redirect(messagesOperation.name)">
                    <img :src=messagesOperation.image>
                    <b-link>{{ messagesOperation.title }}</b-link>
                </div>
            </b-card>
        </li>

        <h2>Parametre İşlemleri</h2>
        <div class="separator"></div>
        <li v-for="parametersOperation in parametersOperations" :key=parametersOperation.name
            class="swatch__wrapper" style="text-align:center">
            <b-card img-alt="Image" img-left>
                <div @click="redirect(parametersOperation.name)">
                    <img :src=parametersOperation.image>
                    <b-link>{{ parametersOperation.title }}</b-link>
                </div>
            </b-card>
        </li>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                subscriptionsOperations: [],
                newspapersOperations: [],
                messagesOperations: [],
                parametersOperations: []
            }
        },

        methods: {
            redirect(name) {
                this.$router.push({name: name});
            },

            async prepare() {
                const router = this.$router;
                let subscriptionsOperations = [];
                let newspapersOperations = [];
                let messagesOperations = [];
                let parametersOperations = [];
                router.options.routes.forEach(function (item) {
                    switch (item.meta.operations) {
                        case "subscriptions":
                            subscriptionsOperations.push({
                                title: item.meta.title,
                                name: item.name,
                                image: item.meta.image
                            });
                            break;
                        case "newspapers":
                            newspapersOperations.push({
                                title: item.meta.title,
                                name: item.name,
                                image: item.meta.image
                            });
                            break;
                        case "messages":
                            messagesOperations.push({title: item.meta.title, name: item.name, image: item.meta.image});
                            break;
                        case "parameters":
                            parametersOperations.push({
                                title: item.meta.title,
                                name: item.name,
                                image: item.meta.image
                            });
                            break;
                    }
                });
                this.subscriptionsOperations = subscriptionsOperations;
                this.newspapersOperations = newspapersOperations;
                this.messagesOperations = messagesOperations;
                this.parametersOperations = parametersOperations;
            }
        },
        beforeMount() {
            this.prepare();
        }
    }
</script>
<style>
    img {
        max-width: 100%;
    }

    .swatch__container {
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .swatch__wrapper {
        padding: 10px 10px 10px 10px;
        display: inline-block;
        width: 25%;
        list-style: none;
        margin-top: 1.4em;
        margin-bottom: 1.4em;
        cursor: pointer;
    }

    .separator {
        border-bottom: solid 1px #ccc;
        margin-bottom: 15px;
    }
</style>
