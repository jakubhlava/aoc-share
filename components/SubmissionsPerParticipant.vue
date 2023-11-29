<script setup lang="ts">
import { groupBy } from "lodash-es/lodash";
import type { SubmissionListProp } from "@/types/submission";

const props = defineProps<{ data: SubmissionListProp[] }>();
const data = groupBy(props.data, ({ user }) => user.name);
</script>

<template>
    <div class="flex flex-col gap-2 my-4">
        <div
            v-for="[participant, submissions] in Object.entries(data)"
            :key="participant"
        >
            {{ participant }} :
            <NuxtLink
                v-for="submission in submissions"
                :key="submission.id"
                :to="`/submissions/${submission.id}`"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ {{ submission.day }} ]
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
