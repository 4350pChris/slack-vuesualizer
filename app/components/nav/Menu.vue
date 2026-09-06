<script lang="ts" setup>
</script>

<template>
  <ul class="menu menu-lg w-full rounded-box capitalize">
    <li>
      <NuxtLinkLocale to="/workspace">
        <Icon name="mdi:home" />
        {{ $t("workspace.word") }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale to="/channels">
        <Icon name="mdi:chat" />
        {{ $t("channel.word", 2) }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale to="/users">
        <Icon name="mdi:account" />
        {{ $t("user.word", 2) }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale to="/files">
        <Icon name="mdi:file-multiple" />
        {{ $t("file", 2) }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
