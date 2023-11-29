<script setup lang="ts">
const route = useRoute();
const showing = ref<"days" | "participants">("participants");

const setShowing = (value: "days" | "participants") => {
    showing.value = value;
};

const { data } = useFetch(`/api/events/${route.params.year}/submissions`);
</script>

<template>
    <div>
        <p>
            Here are code submissions for year
            <span class="text-aoc-gold">{{ route.params.year }}</span
            >, just pick a {{ showing == "days" ? "day" : "participant" }}
            or
            <button
                v-if="showing === 'days'"
                class="text-aoc-link hover:text-aoc-link-focus"
                @click="setShowing('participants')"
            >
                switch to list of participants
            </button>
            <button
                v-else
                class="text-aoc-link hover:text-aoc-link-focus"
                @click="setShowing('days')"
            >
                switch to list of days
            </button>
        </p>
    </div>
    <div>
        <SubmissionsPerParticipant
            v-if="showing === 'participants'"
            :data="data"
        />
        <SubmissionsPerDay v-else :data="data" />
    </div>
</template>

<style scoped></style>
