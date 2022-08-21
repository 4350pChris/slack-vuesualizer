<template>
  <div
    class="drawer-side lg:border-r border-slate-800/10 dark:border-slate-100/25 pt-16"
  >
    <label for="drawer" class="drawer-overlay" ref="toggle"></label>
    <aside
      class="bg-base-100 text-base-content w-80 p-2"
      @click="toggle.click()"
    >
      <NuxtLink
        to="/"
        class="block text-xl py-2 px-4 mb-2 rounded text-gray-600 dark:text-base-content hover:text-base-content dark:hover:text-gray-100 hover:bg-base-200 transition"
      >
        Workspace
      </NuxtLink>
      <ul class="menu menu-compact">
        <li class="menu-title">
          <span>Theme</span>
        </li>
        <li @click.stop>
          <NavThemeToggle class="w-full" />
        </li>
        <li class="menu-title">
          <span>Channels</span>
        </li>
        <li v-for="channel in sortedChannels" :key="channel.id">
          <NuxtLink :to="`/channels/${channel.name}`">
            {{ channel.name }}
          </NuxtLink>
        </li>
      </ul>
      <footer>
        <a
          class="btn btn-ghost btn-block gap-4 my-2"
          href="https://github.com/4350pChris/slack-vuesualizer"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <span class="font-medium text-lg">Slack Vuesualizer</span>
          <GithubIcon class="w-6 h-6" />
        </a>
      </footer>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import GithubIcon from "~icons/line-md/github-loop";

const { data } = await useFetch("/api/channels");

if (data.value.length === 0) {
  await navigateTo("/upload");
}

const sortedChannels = computed(() =>
  data.value.sort((a, b) => a.name.localeCompare(b.name))
);

const toggle = ref<HTMLElement>(null);
</script>
