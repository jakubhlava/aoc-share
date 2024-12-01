<script setup lang="ts">
const event = useState("event", () => new Date().getFullYear());
const day = useState("day", () => 1);

const { data: events } = await useFetch("/api/events/list");

if (new Date().getMonth() === 11) {
    event.value = new Date().getFullYear();
    day.value = new Date().getDate();
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <p>
            Copy and paste your code for
            <span
                v-if="
                    event == new Date().getFullYear() &&
                    event == new Date().getDate()
                "
                class="text-aoc-emph"
            >
                today (day {{ day }} of {{ event }})
            </span>
            <span v-else class="text-aoc-emph">
                day {{ day }} of {{ event }}
            </span>
            in box below and then click
            <span class="text-aoc-emph">submit.</span>
        </p>
        <div class="flex gap-2">
            <span>Or you can change the day and event:</span>

            <span class="flex gap-2">
                <span>day</span>
                <select v-model="day" class="border-none bg-aoc-background">
                    <option
                        v-for="optDay in [...Array(25).keys()]"
                        :key="optDay + 1"
                        :value="optDay + 1"
                    >
                        {{ optDay + 1 }}
                    </option>
                </select>
                <span>year</span>
                <select v-model="event" class="border-none bg-aoc-background">
                    <ClientOnly fallback-tag="option" fallback="Loading...">
                        <option
                            v-for="e in events?.sort((a, b) => b.year - a.year)"
                            :key="e.year"
                            :value="e.year"
                        >
                            {{ e.year }}
                        </option>
                    </ClientOnly>
                </select>
            </span>
        </div>
        <SubmitCode :year="event" :day="day" />
    </div>
</template>

<style scoped></style>
