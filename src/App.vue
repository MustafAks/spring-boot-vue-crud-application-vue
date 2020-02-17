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

    export default {
        data: function() {
            return {
                tabs: ["Home", "Contact"],
                selected: "Home"
            };
        },
        components: {
            Home,
            Contact
        }
    };
</script>

<style>
    @import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
</style>