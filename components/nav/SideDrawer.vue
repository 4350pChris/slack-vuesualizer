<template>
  <div class="drawer-side lg:border-r border-slate-800/15 pt-16">
    <label for="drawer" class="drawer-overlay" ref="toggle"></label>
    <aside class="bg-base-100 text-base-content w-80" @click="toggle.click()">
      <NuxtLink
        to="/"
        class="block text-xl p-2 my-2 mx-6 rounded text-gray-600 hover:text-base-content hover:bg-base-200 transition"
      >
        Workspace
      </NuxtLink>
      <ul class="menu menu-compact py-2 px-4">
        <li class="menu-title">
          <span>Channels</span>
        </li>
        <li v-for="channel in sortedChannels" :key="channel.id">
          <NuxtLink :to="`/channels/${channel.name}`">
            {{ channel.name }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/channels");

if (data.value.length === 0) {
  await navigateTo("/upload");
}

const sortedChannels = computed(() =>
  data.value.sort((a, b) => a.name.localeCompare(b.name))
);

const toggle = ref<HTMLElement>(null);
</script>
