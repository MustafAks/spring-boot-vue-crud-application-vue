<template>
    <div>
        <div class="container">
            <h2>Kayıt</h2>
            <label><b>Username</b></label>
            <input type="text" v-model="username">
            <br>
            <label><b>Description</b></label>
            <input type="text" v-model="description">
            <input type="submit" v-on:click.prevent="create()">
        </div>
    </div>
</template>

<script>
    import CourseDataService from '../service/CourseDataService';
    export default {
        name: "Register",
        data() {
            return {
                username: "",
                description: ""
            };
        },
        methods: {
            create() {
                CourseDataService.createCourse({
                    username: this.username,
                    description: this.description
                }) //HARDCODED
                    .then(response => {
                        this.courses = response.data;
                    });
            }
        }
    };
</script>
