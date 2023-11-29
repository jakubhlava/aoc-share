<script setup lang="ts">
const testWebhook = async () => {
    await useFetch("/api/admin/testwebhook", {
        method: "POST",
    });
};
</script>

<template>
    <button
        class="text-aoc-link hover:text-aoc-link-focus"
        @click="testWebhook"
    >
        [ Test Webhook ]
    </button>
</template>

<style scoped></style>
