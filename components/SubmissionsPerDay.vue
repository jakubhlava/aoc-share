<script setup lang="ts">
import { groupBy } from "lodash-es/lodash";
import type { SubmissionListProp } from "@/types/submission";

const props = defineProps<{ data: SubmissionListProp[] }>();
const data = groupBy(props.data, ({ day }) => day);
</script>

<template>
    <div class="flex flex-col gap-2 my-4">
        <div v-for="[day, submissions] in Object.entries(data)" :key="day">
            {{ day }} :
            <NuxtLink
                v-for="submission in submissions"
                :key="submission.id"
                :to="`/submission/${submission.id}`"
                class="text-aoc-link hover:text-aoc-link-focus"
            >
                [ {{ submission.user.name }} ]
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
