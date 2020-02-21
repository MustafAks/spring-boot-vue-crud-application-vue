<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Today's Meal: {{meal.strMeal}}</h1>
                <p>Area: {{meal.strArea}}</p>
                <p>Category: {{meal.strCategory}}</p>
                <img :src="meal.strMealThumb" class="meal-photo">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Measure</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(ingredient, index) in meal.ingredients" v-bind:key="index">
                        <td>{{meal.ingredients[index]}}</td>
                        <td>{{meal.measures[index]}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    export default {
        name: "latest",
        data() {
            return {
                meal: {}
            };
        },
        methods: {},
        beforeMount: function() {
            request.get(`${APIURL}latest`).end((err, res) => {
                this.meal = res.body.meals[0];
                this.meal.ingredients = [];
                this.meal.measures = [];
                for (let key in this.meal) {
                    if (key.includes("strIngredient")) {
                        let index = +key.replace("strIngredient", "");
                        this.meal.ingredients[index] = this.meal[key];
                    }
                    if (key.includes("strMeasure")) {
                        let index = +key.replace("strMeasure", "");
                        this.meal.measures[index] = this.meal[key];
                    }
                }
                this.meal.ingredients = this.meal.ingredients.filter(i => {
                    return i;
                });
                this.meal.measures = this.meal.measures.filter(m => {
                    return m;
                });
            });
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .meal-photo {
        width: 100%;
    }
</style>