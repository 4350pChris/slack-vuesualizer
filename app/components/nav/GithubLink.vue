<script setup lang="ts">
interface Props {
  simple?: boolean
}

withDefaults(defineProps<Props>(), {
  simple: false,
})
</script>

<template>
  <a
    class="btn btn-ghost"
    :class="{ 'btn-block gap-4': !simple, 'btn-circle': simple }"
    href="https://github.com/4350pChris/slack-vuesualizer"
    target="_blank"
    rel="noopener"
    title="GitHub"
  >
    <Icon name="line-md:github-loop" class="w-6 h-6" />
    <span :class="{ 'sr-only': simple }">{{ $t("github") }}</span>
  </a>
</template>
