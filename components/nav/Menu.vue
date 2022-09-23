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
    <li></li>
    <li class="menu-title capitalize">
      <span>{{ $t("channel.word", 2) }}</span>
    </li>
    <li v-for="channel in channels" :key="channel.id" class="rounded-box">
      <NuxtLink class="rounded-box" :to="`/channels/${channel.name}`">
        {{ channel.name }}
      </NuxtLink>
    </li>
    <li></li>
    <li>
      <NuxtLink class="rounded-box capitalize" to="/upload">
        <UploadIcon />
        {{ $t("upload.word") }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import AccountIcon from "~icons/mdi/account";
import HomeIcon from "~icons/mdi/home";
import UploadIcon from "~icons/mdi/upload";
import type { Channel } from "~~/types/Channel";

interface Props {
  channels: Channel[];
}

defineProps<Props>();
</script>
