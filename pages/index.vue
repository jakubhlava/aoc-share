<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
</script>

<template>
    <div v-if="status == 'unauthenticated'">
        <p class="my-2">
            Hello, you have to login in top right corner to be able to send your
            solutions!
        </p>
        <p class="my-2">
            If you stumbled upon this page by accident, this project is small
            site for closed group of friends who like to share their
            <a
                href="https://adventofcode.com/"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                Advent of Code
            </a>
            solutions.
        </p>
        <p class="my-2">
            If you are interested in running this project for
            <span class="text-aoc-emph drop-shadow-aoc"
                >your group of friends</span
            >, you can find source code on
            <a
                href="https://github.com/jakubhlava/aoc-share/"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                GitHub
            </a>
        </p>
    </div>
    <div v-else>
        Events:
        <ClientOnly fallback-tag="div" fallback="Loading events...">
            <EventList />
        </ClientOnly>
    </div>
</template>

<style scoped></style>
