<template>
  <div class="drawer-side shadow">
    <label for="drawer" class="drawer-overlay"></label>
    <aside class="drawer-side bg-base-100 text-base-content w-80">
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
</script>
