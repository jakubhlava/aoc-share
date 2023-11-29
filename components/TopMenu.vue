<script setup lang="ts"></script>

<template>
    <div class="flex w-full justify-between">
        <div>
            <a href="/" class="text-aoc-link hover:text-aoc-link-focus">
                [ Home ]
            </a>
            <a
                href="/my-submissions"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ My submissions ]
            </a>
            <a href="/submit" class="text-aoc-link hover:text-aoc-link-focus">
                [ Submit file ]
            </a>
        </div>
        <div>
            <LoginButton />
        </div>
    </div>
</template>

<style scoped></style>
