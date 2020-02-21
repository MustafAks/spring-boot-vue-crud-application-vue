<template>
    <div class="container">
        <h1>Random Recipes</h1>
        <div class='row'>
            <div class="col-12">
                <div v-for="meal in meals" :key='meal.idMeal'>
                    <meal-row :meal='meal'></meal-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    export default {
        name: "random-recipe",
        data() {
            return {
                meals: []
            };
        },
        methods: {
            search() {
                request.get(`${APIURL}random`).end((err, res) => {
                    this.meals = res.body.meals;
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
            this.search();
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>