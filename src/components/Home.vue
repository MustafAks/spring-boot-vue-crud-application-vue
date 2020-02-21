<template>
    <div>
        <h1>Application</h1>
        <ListCoursesComponent></ListCoursesComponent>
    </div>
</template>

<script>
    import ListCoursesComponent from "./ListCoursesComponent";
    export default {
        name: "InstructorApp",
        components: {
            ListCoursesComponent
        }
    };
</script>

<style scoped>
</style>