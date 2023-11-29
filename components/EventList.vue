<script setup lang="ts">
const { data } = await useFetch("/api/events/list");
const props = defineProps<{ my?: boolean }>();
</script>

<template>
    <div></div>
    <a
        v-for="event in data"
        :key="event.year"
        :href="
            props.my ? `/submissions/my/${event.year}` : `/events/${event.year}`
        "
        class="text-aoc-link hover:text-aoc-link-focus"
    >
        [ {{ event.year }} ]
    </a>
</template>

<style scoped></style>
