<script setup lang="ts">
const route = useRoute();
const id =
    typeof route.params.id === "string" ? route.params.id : route.params.id[0];
</script>

<template>
    <CodeView :id="parseInt(id)" />
</template>

<style scoped></style>
