<template>
    <div>
        <button
                v-for="tab in tabs"
                :key="tab"
                @click="selected = tab;"
                :class="['tab-btn', { active: selected === tab }]"
        >
            {{ tab }}
        </button>

        <component :is="selected" class="tab"></component>
    </div>
</template>

<script>
    import Home from "./components/Home";
    import Contact from "./components/Contact";
    import Register from "./components/Register";
    import FilterList from "./components/List";

    export default {
        data: function() {
            return {
                tabs: ["Home", "Contact","Register", "FilterList"],
                selected: "Home"
            };
        },
        components: {
            Home,
            Contact,
            Register,
            FilterList
        }
    };
</script>

<style>
    @import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css);
</style>
