<script lang="ts" setup>
const colorMode = useColorMode()

const dark = ref<boolean>()

onMounted(() => {
  dark.value
    = colorMode.preference === 'business'
    || colorMode.value === 'dark'
    || (colorMode.value === 'system'
      && window.matchMedia('(prefers-color-scheme: dark)').matches)
})

watch(dark, (d) => {
  colorMode.preference = d ? 'business' : 'fantasy'
})

const themeColor = computed(() => (dark.value ? '#212121' : '#000000'))

useHead({
  meta: [
    {
      name: 'theme-color',
      content: themeColor,
    },
  ],
})
</script>

<template>
  <button
    class="hover:bg-slate-100 dark:hover:bg-slate-600 transition rounded-full p-2"
    @click="dark = !dark"
  >
    <span class="sr-only">{{ $t("switchTheme") }}</span>
    <div v-if="dark" class="h-8 w-8 i-line-md:moon text-sky-100" />
    <div
      v-else
      class="h-8 w-8 i-line-md:sun-rising-twotone-loop text-amber-400"
    />
  </button>
</template>
