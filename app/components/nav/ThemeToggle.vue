<script lang="ts" setup>
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
    <Icon v-if="dark" name="line-md:moon" class="h-8 w-8 text-sky-100" />
    <Icon v-else name="line-md:sun-rising-twotone-loop" class="h-8 w-8 text-amber-400" />
  </button>
</template>
