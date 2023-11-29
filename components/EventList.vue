<script setup lang="ts">
const { data } = await useFetch("/api/events/list");
</script>

<template>
    <div></div>
    <a
        v-for="event in data"
        :key="event.year"
        :href="`/events/${event.year}`"
        class="text-aoc-link hover:text-aoc-link-focus"
        >[ {{ event.year }} ]</a
    >
</template>

<style scoped></style>
