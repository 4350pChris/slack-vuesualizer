<template>
  <aside class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
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
</template>

<script lang="ts" setup>
const { data: channels } = await useFetch("/api/channels");

if (!channels) {
  await navigateTo("/upload");
}

const sortedChannels = computed(() =>
  channels.value.sort((a, b) => a.name.localeCompare(b.name))
);
</script>
