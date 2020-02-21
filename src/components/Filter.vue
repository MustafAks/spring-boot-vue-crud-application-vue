<template>
    <div class="container">
        <div class='row'>
            <div class="col-12">
                <h1>
                    <span v-if="$route.params.type == 'category'">Category - </span>
                    <span v-if="$route.params.type == 'area'">Area - </span>
                    {{$route.params.keyword}}
                </h1>
                <div v-for="meal in meals" v-bind:key='meal.idMeal'>
                    <filter-row :meal='meal'></filter-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    import MealRow from "./MealRow";
    export default {
        name: "search",
        data() {
            return {
                keyword: "",
                meals: []
            };
        },
        methods: {
            searchByParam(type, keyword) {
                request.get(`${APIURL}filter/${type}/${keyword}`).end((err, res) => {
                    this.meals = res.body.meals;
                    if (!res.body.meals){
                        return;
                    }
                    this.meals = this.meals.map(m => {
                        m.ingredients = [];
                        m.measures = [];
                        for (let key in m) {
                            if (key.includes("strIngredient")) {
                                let index = +key.replace("strIngredient", "");
                                m.ingredients[index] = m[key];
                            }
                            if (key.includes("strMeasure")) {
                                let index = +key.replace("strMeasure", "");
                                m.measures[index] = m[key];
                            }
                        }
                        m.ingredients = m.ingredients.filter(i => {
                            return i;
                        });
                        m.measures = m.measures.filter(m => {
                            return m;
                        });
                        return m;
                    });
                });
            }
        },
        beforeMount() {
            if (this.$route.params.keyword) {
                this.searchByParam(this.$route.params.type, this.$route.params.keyword);
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.searchByParam(to.params.type, to.params.keyword);
            next();
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>