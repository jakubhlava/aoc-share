<script setup lang="ts">
const route = useRoute();
const showing = ref<"days" | "participants">("days");
</script>

<template>
    <div>
        <p>
            Hello, here are code submissions for year
            <span class="text-aoc-gold">{{ route.params.year }}</span
            >, just pick a {{ showing == "days" ? "day" : "participant" }}
            or
            <button
                v-if="showing === 'days'"
                class="text-aoc-link hover:text-aoc-link-focus"
                @click="showing = 'participants'"
            >
                switch to list of participants
            </button>
            <button
                v-else
                class="text-aoc-link hover:text-aoc-link-focus"
                @click="showing = 'days'"
            >
                switch to list of days
            </button>
        </p>
    </div>
</template>

<style scoped></style>
