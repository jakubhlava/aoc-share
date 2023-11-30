<script setup lang="ts">
const props = defineProps<{
    status: string;
    data: any;
    signIn: any;
    signOut: any;
    user: any;
}>();

console.log(props.data);
console.log(props.user);
console.log(props.status);
</script>

<template>
    <div
        v-if="props.status === 'authenticated'"
        class="flex gap-2 items-center"
    >
        Logged in as
        <span class="text-aoc-emph drop-shadow-aoc">
            {{ props.data?.user?.name }}
        </span>
        <span v-if="props.user?.accessLevel === 'admin'" class="text-aoc-gold"
            >( Admin )</span
        >
        <button
            v-if="props.user?.accessLevel === 'admin'"
            class="text-aoc-link hover:text-aoc-link-focus"
        >
            [ Admin Panel ]
        </button>
        <button
            class="text-aoc-link hover:text-aoc-link-focus"
            @click="props.signOut()"
        >
            [ Logout ]
        </button>
    </div>
    <button
        v-else
        class="text-aoc-link hover:text-aoc-link-focus"
        @click="props.signIn('discord')"
    >
        [ Login with Discord ]
    </button>
</template>

<style scoped></style>
