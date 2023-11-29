<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: user } = await useFetch("/api/user/info", { headers });
</script>

<template>
    <div v-if="status === 'authenticated'" class="flex gap-2 items-center">
        Logged in as
        <span class="text-aoc-emph drop-shadow-aoc">
            {{ data?.user?.name }}
        </span>
        <span v-if="user?.accessLevel === 'admin'" class="text-aoc-gold"
            >( Admin )</span
        >
        <button class="text-aoc-link hover:text-aoc-link-focus">
            [ Admin Panel ]
        </button>
        <button
            class="text-aoc-link hover:text-aoc-link-focus"
            @click="signOut()"
        >
            [ Logout ]
        </button>
    </div>
    <button
        v-else
        class="text-aoc-link hover:text-aoc-link-focus"
        @click="signIn('discord')"
    >
        [ Login with Discord ]
    </button>
</template>

<style scoped></style>
