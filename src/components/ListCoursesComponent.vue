<template>
    <div class="container">
        <h3>Get All</h3>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="course in courses" v-bind:key="course.id">
                    <td>{{course.id}}</td>
                    <td>{{course.description}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import CourseDataService from '../service/CourseDataService';
    export default {
        name: "CoursesList",
        data() {
            return {
                courses: [],
                message: null,
                INSTRUCTOR: "Project - X"
            };
        },
        methods: {
            refreshCourses() {
                CourseDataService.retrieveAllCourses(this.INSTRUCTOR) //HARDCODED
                    .then(response => {
                        this.courses = response.data;
                    });
            }
        },
        created() {
            this.refreshCourses();
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        max-width: 100%;
    }
</style>