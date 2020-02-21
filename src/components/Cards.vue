<script>
    import axios from "axios";
    export default {
        data() {
            return {
                meals: []
            };
        },
        mounted() {
            axios
                .get("https://www.themealdb.com/api/json/v1/1/categories.php")
                .then(response => {
                    this.meals = response.data.categories;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>