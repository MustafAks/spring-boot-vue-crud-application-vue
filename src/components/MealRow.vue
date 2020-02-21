<template>
    <div class="row">
        <div class="col">
            <h1>{{meal.strMeal}}</h1>
            <p>
                <b>Area:</b> {{meal.strArea}}</p>
            <p>
                <b>Category:</b> {{meal.strCategory}}</p>
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
            <img :src="meal.strMealThumb">
        </div>
    </div>
</template>
<script>
    // eslint-disable-next-line no-unused-vars
    const request = require("superagent");
    export default {
        name: "meal-row",
        props: ["meal"],
        data() {
            return {};
        },
        methods: {},
        computed: {
            computedClass: function() {
                if (this.meal != null) {
                    return this.meal;
                }
                return {};
            }
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        max-width: 100%;
    }
</style>