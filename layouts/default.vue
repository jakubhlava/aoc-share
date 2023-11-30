<template>
    <div class="flex flex-col px-4">
        <div class="flex gap-4 justify-between items-center w-full h-16 sticky">
            <div>
                <a
                    href="/"
                    class="text-aoc-link-highlight hover:text-aoc-link-focus text-xl"
                >
                    (Advent of) Code Storage
                </a>
            </div>
            <div class="flex-grow">
                <TopMenu />
            </div>
        </div>
        <slot />
    </div>
</template>
