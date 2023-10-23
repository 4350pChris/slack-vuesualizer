<script lang="ts" setup>
import MoonIcon from '~icons/line-md/moon'
import SunIcon from '~icons/line-md/sun-rising-twotone-loop'

const colorMode = useColorMode()

const dark = ref<boolean>(false)

onMounted(() => {
  dark.value = colorMode.preference === 'business'
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
    class="btn btn-ghost btn-circle swap swap-rotate" :class="{ 'swap-active': dark }"
    :title="$t('switchTheme')"
    @click="dark = !dark"
  >
    <span class="sr-only">{{ $t("switchTheme") }}</span>
    <MoonIcon v-if="dark" class="h-8 w-8 text-sky-100" />
    <SunIcon v-else class="h-8 w-8 text-amber-400" />
  </button>
</template>
