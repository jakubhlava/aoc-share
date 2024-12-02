<script setup lang="ts">
const route = useRoute();
const { data } = useFetch(`/api/events/${route.params.year}/submissions/my`);
</script>

<template>
    <p>
        Your submissions for year
        <span class="text-aoc-gold">{{ route.params.year }}</span
        >:
    </p>
    <div class="flex flex-col gap-2">
        <LazyNuxtLink
            v-for="submission in data"
            :to="`/submission/${submission.id}`"
            class="text-aoc-link hover:text-aoc-link-focus"
            >Day {{ submission.day }}
        </LazyNuxtLink>
    </div>
</template>

<style scoped></style>
