<template>
  <div class="w-full bg-base-300 navbar">
    <div class="navbar-start">
      <label
        for="drawer"
        class="btn btn-ghost btn-circle lg:hidden"
        tabindex="0"
      >
        <MenuIcon class="w-6 h-6" />
      </label>
    </div>
    <div class="navbar-center">
      <MessageSearch />
    </div>
    <div class="navbar-end">
      <span class="hidden md:inline-block text-xl mr-4">Slack Vuesualizer</span>
      <a
        class="btn btn-ghost btn-circle"
        href="https://github.com/4350pChris/slack-export-vuer"
        rel="noopener noreferrer"
      >
        <GithubIcon class="w-6 h-6" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuIcon from "~icons/line-md/menu";
import GithubIcon from "~icons/line-md/github-loop";
</script>
