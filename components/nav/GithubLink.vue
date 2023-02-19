<script setup lang="ts">
import GithubIcon from '~icons/line-md/github-loop'

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
    <GithubIcon class="w-6 h-6" />
    <span :class="{ 'sr-only': simple }">{{ $t("github") }}</span>
  </a>
</template>
