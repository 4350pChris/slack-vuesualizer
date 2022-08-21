<template>
  <button class="btn btn-ghost btn-circle" @click="dark = !dark">
    <span class="sr-only">Switch theme</span>
    <MoonIcon v-if="dark" class="h-8 w-8 text-sky-100" />
    <SunIcon v-else class="h-8 w-8 text-amber-400" />
  </button>
</template>

<script lang="ts" setup>
import MoonIcon from "~icons/line-md/moon";
import SunIcon from "~icons/line-md/sun-rising-twotone-loop";

const colorMode = useColorMode();

const dark = ref<boolean>();

onMounted(() => {
  dark.value =
    colorMode.preference === "business" ||
    colorMode.value === "dark" ||
    (colorMode.value === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
});

watch(dark, (d) => {
  colorMode.preference = d ? "business" : "fantasy";
});
</script>
