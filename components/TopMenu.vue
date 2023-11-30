<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: user } = await useFetch("/api/user/info", { headers });
</script>

<template>
    <div class="flex w-full justify-between">
        <div class="flex gap-2">
            <NuxtLink to="/" class="text-aoc-link hover:text-aoc-link-focus">
                [ Home ]
            </NuxtLink>
            <div v-if="status === 'authenticated'">
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
            />
        </div>
    </div>
</template>

<style scoped></style>
