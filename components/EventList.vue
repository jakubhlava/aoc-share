<script setup lang="ts">
const { data } = await useFetch("/api/events/list");
const props = defineProps<{ my?: boolean }>();
const sorted = computed(() => data.value?.sort((a, b) => a.year - b.year));
</script>

<template>
    <div></div>
    <a
        v-for="event in sorted"
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
