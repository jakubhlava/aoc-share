<script setup lang="ts">
const { data, status, signIn, signOut } = useAuth();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const {
    data: user,
    pending,
    error,
} = await useFetch("/api/user/info", { headers });
</script>

<template>
    <div v-if="pending" class="flex w-full justify-end">
        <span> Loading... </span>
    </div>
    <div v-else class="flex w-full justify-between">
        <div class="flex gap-2">
            <NuxtLink to="/" class="text-aoc-link hover:text-aoc-link-focus">
                [ Home ]
            </NuxtLink>
            <div v-if="error === null">
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
            <LoginButton
                :status="status"
                :data="data"
                :sign-in="signIn"
                :sign-out="signOut"
                :user="user"
                :error="error"
            />
        </div>
    </div>
</template>

<style scoped></style>
