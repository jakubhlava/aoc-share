<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <CodeView :id="route.params.id" />
</template>

<style scoped></style>
