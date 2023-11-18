<script lang="ts" setup>
import GithubIcon from '~icons/line-md/github-loop'
import SlackIcon from '~icons/logos/slack-icon'

const token = useToken()
const localeRoute = useLocaleRoute()

const leave = async () => {
  token.value = null
  await navigateTo(localeRoute({ name: 'index' }))
}
</script>

<template>
  <footer class="flex flex-col items-center gap-4 p-2">
    <div class="flex flex-col gap-4 mb-4">
      <button class="btn btn-sm btn-outline btn-error" @click="leave">
        {{ $t("workspace.leave") }}
      </button>
      <WorkspaceDelete />
    </div>
    <p class="flex items-center gap-2">
      <SlackIcon class="w-8 h-8" />
      <span class="font-medium text-2xl">Vuesualizer</span>
    </p>
    <div>
      <a
        class="btn btn-ghost btn-block gap-4"
        href="https://github.com/4350pChris/slack-vuesualizer"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
      >
        <GithubIcon class="w-6 h-6" />
        <span>{{ $t("github") }}</span>
      </a>
    </div>
  </footer>
</template>
