<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { ref } from "vue";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { csharp } from "@replit/codemirror-lang-csharp";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Submission, User } from "@prisma/client";
import LanguageButton from "~/components/LanguageButton.vue";

const props = defineProps<{
    id: number;
}>();

const { data, status } = await useFetch(`/api/submission/${props.id}`);

const user = useState<User | null>("user", () => null);

const description = useState("description", () => "");

const editCode = ref(data?.value?.content ?? "");
const languageMappings = {
    javascript: javascript(),
    python: python(),
    cpp: cpp(),
    csharp: csharp(),
    java: java(),
    php: php(),
};
const extensions = ref<any>([oneDark]);

const view = ref();
const handleReady = (payload: any) => {
    view.value = payload.view;
};

const changeLanguage = async (language: string) => {
    extensions.value = [
        Object.hasOwnProperty.call(languageMappings, language),
        oneDark,
    ];
    const { data: responseData } = await useFetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
            preferredLanguage: language,
        }),
    });
    user.value = responseData.value;
};

const saveEdit = async () => {
    const responseData = await $fetch(`/api/submission/${props.id}/edit`, {
        method: "POST",
        body: JSON.stringify({
            content: editCode.value,
            description: description.value,
            language: user.value?.preferredLanguage,
        }),
    });
    const response = responseData as Submission;
    await navigateTo(`/submission/${response.id}`);
};

onMounted(async () => {
    await nextTick(async () => {
        user.value = (await useCurrentUser()).value;
    });
    extensions.value = [languageMappings.python, oneDark];
    // extensions.value = [
    //     Object.hasOwnProperty.call(
    //         languageMappings,
    //         user.value?.preferredLanguage ?? "python",
    //     ),
    //     oneDark,
    // ];
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <p v-if="status == 'success'">
            You are editing your solution for day {{ data?.day }} of
            {{ data?.eventId }}.
        </p>
        <p v-else-if="status == 'pending'">Loading...</p>
        <p v-else>Error loading data.</p>
        <div class="flex w-full justify-between">
            <div class="flex gap-2">
                <LanguageButton
                    language="python"
                    display="Python"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
                <LanguageButton
                    language="php"
                    display="PHP"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
                <LanguageButton
                    language="javascript"
                    display="JavaScript"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
                <LanguageButton
                    language="cpp"
                    display="C/C++"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
                <LanguageButton
                    language="csharp"
                    display="C#"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
                <LanguageButton
                    language="java"
                    display="Java"
                    :selected="user?.preferredLanguage"
                    :onclick="changeLanguage"
                />
            </div>
            <div>
                <button
                    class="text-aoc-link hover:text-aoc-link-focus"
                    @click="saveEdit"
                >
                    [ Save ]
                </button>
            </div>
        </div>
        <ClientOnly :style="{ height: '400px' }">
            <codemirror
                id="edit"
                v-model="editCode"
                placeholder="Insert your code here..."
                :style="{ height: '400px' }"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="extensions"
                @ready="handleReady"
                @change="console.log('change', $event)"
                @focus="console.log('focus', $event)"
                @blur="console.log('blur', $event)"
            />
        </ClientOnly>
        <label>Description (optional):</label>
        <textarea
            v-model="description"
            rows="5"
            class="bg-aoc-background border border-aoc-text"
        ></textarea>
    </div>
</template>

<style scoped></style>
