<script setup lang="ts">
import groupBy from "lodash/groupBy";
import type { SubmissionListProp, SubmissionUser } from "@/types/submission";

const props = defineProps<{ data: SubmissionListProp[] }>();
const data = groupBy(
    props.data,
    ({ user }: { user: SubmissionUser }) => user.name,
);
</script>

<template>
    <div class="flex flex-col gap-2 my-4">
        <div
            v-for="[participant, submissions] in Object.entries(data)"
            :key="participant"
        >
            {{ participant }} :
            <NuxtLink
                v-for="submission in submissions.sort((a, b) => a.day - b.day)"
                :key="submission.id"
                :to="`/submission/${submission.id}`"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ {{ submission.day }} ]
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
