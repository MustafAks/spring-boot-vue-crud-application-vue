<template>
    <div>
        <h1>Application</h1>
        <ListCoursesComponent></ListCoursesComponent>
    </div>
</template>

<script>
    import AbonelerList from "./ListCoursesComponent";
    export default {
        name: "InstructorApp",
        components: {
            AbonelerList
        }
    };
</script>

<style scoped>
</style>
