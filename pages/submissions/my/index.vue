<script setup lang="ts"></script>

<template>
    <div>
        Events:
        <ClientOnly fallback-tag="div" fallback="Loading events...">
            <EventList :my="true" />
        </ClientOnly>
    </div>
</template>

<style scoped></style>
