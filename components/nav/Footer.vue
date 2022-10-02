<script lang="ts" setup>
const token = useToken()

const leave = async () => {
  token.value = undefined
  await navigateTo('/')
}
</script>

<template>
  <footer class="flex flex-col items-center gap-4 p-2">
    <div class="mb-4">
      <button class="btn btn-sm btn-outline btn-error" @click="leave">
        {{ $t("workspace.leave") }}
      </button>
    </div>
    <p class="flex items-center gap-2">
      <span class="w-8 h-8 i-logos:slack-icon" />
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
        <span class="w-6 h-6 i-line-md:github-loop" />
        <span>{{ $t("github") }}</span>
      </a>
    </div>
  </footer>
</template>
