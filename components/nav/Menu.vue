<script lang="ts" setup>
import AccountIcon from '~icons/mdi/account'
import FilesIcon from '~icons/mdi/file-multiple'
import HomeIcon from '~icons/mdi/home'
import ChatIcon from '~icons/mdi/chat'
</script>

<template>
  <ul class="menu menu-compact">
    <li>
      <NuxtLinkLocale class="capitalize rounded-box" to="/workspace">
        <HomeIcon />
        {{ $t("workspace.word") }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale class="capitalize rounded-box" to="/users">
        <AccountIcon />
        {{ $t("user.word", 2) }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale class="capitalize rounded-box" to="/files">
        <FilesIcon />
        {{ $t("file", 2) }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale class="capitalize rounded-box" to="/channels">
        <ChatIcon />
        {{ $t("channel.word", 2) }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
