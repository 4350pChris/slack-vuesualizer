<script lang="ts" setup>
import type { Channel } from '~~/types/Channel'

interface Props {
  channels: Channel[]
}

defineProps<Props>()
</script>

<template>
  <ul class="menu menu-compact">
    <li>
      <NuxtLink class="capitalize rounded-box" to="/workspace">
        <span class="i-mdi:home" />
        {{ $t("workspace.word") }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="capitalize rounded-box" to="/users">
        <span class="i-mdi:account" />
        {{ $t("user", 2) }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="capitalize rounded-box" to="/files">
        <span class="i-mdi:file-multiple" />
        {{ $t("file", 2) }}
      </NuxtLink>
    </li>
    <li />
    <li class="menu-title capitalize">
      <span>{{ $t("channel.word", 2) }}</span>
    </li>
    <li v-for="channel in channels" :key="channel.id" class="rounded-box">
      <NuxtLink class="rounded-box" :to="`/channels/${channel.name}`">
        {{ channel.name }}
      </NuxtLink>
    </li>
    <li />
    <li>
      <NuxtLink class="rounded-box capitalize" to="/upload">
        <span class="i-mdi:upload" />
        {{ $t("upload.word") }}
      </NuxtLink>
    </li>
  </ul>
</template>
