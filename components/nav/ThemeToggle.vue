<script lang="ts" setup>
import MoonIcon from '~icons/line-md/moon'
import SunIcon from '~icons/line-md/sun-rising-twotone-loop'

const colorMode = useColorMode()

let dark = $ref<boolean>()

onMounted(() => {
  dark = colorMode.preference === 'business'
        || colorMode.value === 'dark'
        || (colorMode.value === 'system'
        && window.matchMedia('(prefers-color-scheme: dark)').matches)
})

watch($$(dark), (d) => {
  colorMode.preference = d ? 'business' : 'fantasy'
})

const themeColor = $computed(() => (dark ? '#212121' : '#000000'))

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
    class="hover:bg-slate-100 dark:hover:bg-slate-600 transition rounded-full p-2 swap swap-rotate" :class="{ 'swap-active': dark }"
    @click="dark = !dark"
  >
    <span class="sr-only">{{ $t("switchTheme") }}</span>
    <MoonIcon v-if="dark" class="h-8 w-8 text-sky-100" />
    <SunIcon v-else class="h-8 w-8 text-amber-400" />
  </button>
</template>
