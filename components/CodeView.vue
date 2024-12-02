<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import type { Submission, User } from "@prisma/client";

const props = defineProps<{ id: number }>();

const data = useState<(Submission & { user: User }) | null>(
    "submission",
    () => null,
);
const currentUser = useState<User | null>("user", () => null);
const highlightedCode = useState<string>("highlightedCode", () => "");

const contentLength = computed(
    () => (data.value?.content.match(/\n/g) || []).length,
);

onMounted(async () => {
    await nextTick(async () => {
        data.value = (await useFetch(`/api/submission/${props.id}`)).data
            .value as Submission & { user: User };
        currentUser.value = (await useCurrentUser()).value;
    });
    highlightedCode.value = hljs.highlight(data.value?.content ?? "", {
        language: data.value?.language ?? "python",
    }).value;
});

const deleteSolution = async () => {
    const responseData = await $fetch(`/api/submission/${props.id}/delete`, {
        method: "POST",
    });
    if (responseData) {
        await navigateTo(`/events/${data?.value?.eventId}`);
    }
};
</script>

<template>
    <p class="my-2">
        Code by <span class="text-aoc-emph"> {{ data?.user.name }} </span> for
        day {{ data?.day }} of {{ data?.eventId }}, solution has
        {{ contentLength > 0 ? contentLength : 1 }} line{{
            contentLength > 1 ? "s" : ""
        }}.
    </p>
    <pre v-html="highlightedCode" />

    <div class="my-2">
        Author's description:
        <p>{{ data?.description }}</p>
    </div>

    <div v-if="currentUser?.name === data?.user.name" class="my-2 flex gap-4">
        <LazyNuxtLink
            :to="{ name: 'submission-id-edit', params: { id: props.id } }"
            class="text-aoc-link hover:text-aoc-link-focus"
        >
            [ Edit ]
        </LazyNuxtLink>
        <button
            class="text-aoc-link hover:text-aoc-link-focus"
            @click="deleteSolution"
        >
            [ Delete ]
        </button>
    </div>
</template>

<style scoped></style>
