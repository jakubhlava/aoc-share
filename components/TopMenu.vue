<script setup lang="ts"></script>

<template>
    <div class="flex w-full justify-between">
        <div>
            <NuxtLink to="/" class="text-aoc-link hover:text-aoc-link-focus">
                [ Home ]
            </NuxtLink>
            <NuxtLink
                to="/submissions/my"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ My submissions ]
            </NuxtLink>
            <NuxtLink
                to="/submit"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ Submit file ]
            </NuxtLink>
        </div>
        <div>
            <LoginButton />
        </div>
    </div>
</template>

<style scoped></style>
