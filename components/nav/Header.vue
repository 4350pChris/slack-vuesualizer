<template>
  <div
    class="h-16 w-full sticky top-0 z-30 shadow-sm text-base-content bg-base-100 flex justify-center"
  >
    <nav class="navbar w-full px-2">
      <div class="flex-none lg:hidden" v-if="!simple">
        <label for="drawer" class="btn btn-ghost btn-circle" tabindex="0">
          <MenuIcon class="w-6 h-6" />
        </label>
      </div>
      <div class="grow mx-4">
        <MessageSearch v-if="!simple" />
      </div>
      <div class="flex-none">
        <span class="hidden md:inline-block text-xl mr-4"
          >Slack Vuesualizer</span
        >
        <a
          class="btn btn-ghost btn-circle"
          href="https://github.com/4350pChris/slack-export-vuer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon class="w-6 h-6" />
        </a>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import MenuIcon from "~icons/line-md/menu";
import GithubIcon from "~icons/line-md/github-loop";

interface Props {
  simple?: boolean;
}

defineProps<Props>();
</script>
