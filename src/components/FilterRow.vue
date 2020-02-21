<template>
    <div class="row">
        <div class="col">
            <h1>{{meal.strMeal}}</h1>
            <img :src="meal.strMealThumb" @click="showModal" class="meal-thumb">
            <b-modal ref="mealModal" hide-footer :title="meal.strMeal">
                <div class="row">
                    <div class="col">
                        <h1>{{meal.strMeal}}</h1>
                        <p>
                            <b>Area:</b> {{meal.strArea}}</p>
                        <p>
                            <b>Category:</b> {{meal.strCategory}}</p>
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
                <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-btn>
            </b-modal>
        </div>
    </div>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    export default {
        name: "meal-row",
        props: ["meal"],
        data() {
            return {};
        },
        methods: {
            showModal() {
                this.$refs.mealModal.show();
                this.getMeal(this.meal.idMeal);
            },
            hideModal() {
                this.$refs.mealModal.hide();
            },
            getMeal(id) {
                request.get(`${APIURL}lookup/${id}`).end((err, res) => {
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
        },
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
    .meal-photo {
        width: 100%;
    }
    .meal-thumb {
        cursor: pointer;
        width: 100%;
    }
</style>