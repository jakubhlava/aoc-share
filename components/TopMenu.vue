<script setup lang="ts">
const { status } = useAuth();
</script>

<template>
    <div class="flex w-full justify-between">
        <div class="flex gap-2">
            <NuxtLink to="/" class="text-aoc-link hover:text-aoc-link-focus">
                [ Home ]
            </NuxtLink>
            <div v-if="status === 'authenticated'" class="flex gap-2">
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
        </div>
        <div>
            <LoginButton />
        </div>
    </div>
</template>

<style scoped></style>
