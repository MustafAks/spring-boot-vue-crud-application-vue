<template>
    <div class="container">
        <div class='row'>
            <div class="col-12">
                <h1>Search</h1>
            </div>
        </div>
        <div class='row'>
            <div class="col-12">
                <b-form @submit="search" @reset="keyword = ''">
                    <b-form-group label="Keyword">
                        <b-form-input type="text" v-model="keyword" required name="keyword" v-validate="'required'" placeholder="Search keyword">
                        </b-form-input>
                        <span v-show="errors.has('keyword')">{{ errors.first('keyword') }}</span>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Search</b-button>
                </b-form>
            </div>
        </div>
        <div class='row'>
            <div class="col-12" v-if="meals && meals.length > 0">
                <h1>Results</h1>
                <div v-for="meal in meals" v-bind:key='meal.idMeal'>
                    <meal-row :meal='meal'></meal-row>
                </div>
            </div>
            <div class="col-12" v-else>
                <h2>No Results Found</h2>
            </div>
        </div>
    </div>
</template>
<script>
    const request = require("superagent");
    import { APIURL } from "../main";
    export default {
        name: "search",
        data() {
            return {
                keyword: "",
                meals: []
            };
        },
        methods: {
            search(evt) {
                evt.preventDefault();
                if (this.errors.any()) {
                    return;
                }
                request.get(`${APIURL}search/${this.keyword}`).end((err, res) => {
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
            },
            searchParam(keyword) {
                this.keyword = keyword;
                request
                    .get(`${APIURL}search/${keyword}`)
                    .end((err, res) => {
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
            this.$route.params.keyword && this.searchParam(this.$route.params.keyword);
        },
        beforeRouteUpdate(to, from, next) {
            this.searchParam(to.params.keyword);
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