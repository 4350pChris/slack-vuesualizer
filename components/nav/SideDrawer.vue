<template>
  <div
    class="drawer-side lg:border-r border-slate-800/10 dark:border-slate-100/25 pt-16"
  >
    <label for="drawer" class="drawer-overlay" ref="toggle"></label>
    <aside
      class="bg-base-100 text-base-content w-80 p-2"
      @click="toggle.click()"
    >
      <NavThemeToggle class="w-full" />

      <ul class="menu menu-compact">
        <li>
          <NuxtLink to="/"> Workspace </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/users">
            <AccountIcon />
            Users
          </NuxtLink>
        </li>
        <li></li>
        <li class="menu-title">
          <span>Channels</span>
        </li>
        <li v-for="channel in channels" :key="channel.id" class="rounded-box">
          <NuxtLink :to="`/channels/${channel.name}`">
            {{ channel.name }}
          </NuxtLink>
        </li>
      </ul>
      <div
        class="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"
      ></div>
      <footer class="flex flex-col items-center gap-2 p-2">
        <p class="flex items-center gap-2">
          <SlackIcon class="w-8 h-8" />
          <span class="font-medium text-2xl">Vuesualizer</span>
        </p>
        <div>
          <a
            class="btn btn-ghost btn-block gap-4 my-2"
            href="https://github.com/4350pChris/slack-vuesualizer"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <GithubIcon class="w-6 h-6" />
            <span>view on GitHub</span>
          </a>
        </div>
      </footer>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import GithubIcon from "~icons/line-md/github-loop";
import AccountIcon from "~icons/mdi/account";
import SlackIcon from "~icons/logos/slack-icon";

const toggle = ref<HTMLElement>(null);

const channels = useChannels();
</script>
