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
    year: number;
    day: number;
}>();

const year = useState<number | null>("year", () => props.year ?? null);
const day = useState<number | null>("day", () => props.day ?? null);

const user = useState<User | null>("user", () => null);

const description = useState("description", () => "");

const code = ref(``);
const languageMappings = new Map([
    ["javascript", javascript()],
    ["python", python()],
    ["cpp", cpp()],
    ["csharp", csharp()],
    ["java", java()],
    ["php", php()],
]);
const extensions = ref<any>([oneDark]);

const view = shallowRef();
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

const submitCode = async () => {
    const { data: responseData } = await useFetch("/api/submission/submit", {
        method: "POST",
        body: JSON.stringify({
            event: year.value,
            day: day.value,
            content: code.value,
            description: description.value,
            language: user.value?.preferredLanguage,
        }),
    });
    const response = responseData.value as Submission;
    await navigateTo(`/submission/${response.id}`);
};

onMounted(async () => {
    await nextTick(async () => {
        user.value = (await useCurrentUser()).value;
    });
    extensions.value = [
        languageMappings.get(user.value?.preferredLanguage ?? "python"),
        oneDark,
    ];
});
</script>

<template>
    <div class="flex flex-col gap-4">
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
                    @click="submitCode"
                >
                    [ Submit ]
                </button>
            </div>
        </div>
        <ClientOnly :style="{ height: '400px' }">
            <codemirror
                v-model="code"
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
