<script lang="ts" setup>
import AccountIcon from '~icons/mdi/account'
import FilesIcon from '~icons/mdi/file-multiple'
import HomeIcon from '~icons/mdi/home'
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
        <HomeIcon />
        {{ $t("workspace.word") }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="capitalize rounded-box" to="/users">
        <AccountIcon />
        {{ $t("user", 2) }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink class="capitalize rounded-box" to="/files">
        <FilesIcon />
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
  </ul>
</template>
