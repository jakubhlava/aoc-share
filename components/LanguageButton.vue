<script setup lang="ts">
const props = defineProps<{
    language: "javascript" | "python" | "cpp" | "csharp" | "java" | "php";
    selected?: string;
    display: string;
    onclick: (language: string) => void;
}>();
</script>

<template>
    <button
        :key="selected"
        class="text-aoc-link hover:text-aoc-link-focus"
        :class="{
            'text-aoc-link-highlight': selected === language,
        }"
        @click="onclick(language)"
    >
        [ {{ display }} ]
    </button>
</template>

<style scoped></style>
