<script lang="ts" setup>
import type { Dm } from '~/types/Dm'
import AccountIcon from '~icons/mdi/account'
import FilesIcon from '~icons/mdi/file-multiple'
import HomeIcon from '~icons/mdi/home'
import type { Channel } from '~~/types/Channel'

interface Props {
  dms: Dm[]
  channels: Channel[]
  groups: Channel[]
  mpims: Channel[]
}

const props = defineProps<Props>()

const { withUsernames } = useWithUsernames()

const dmsWithUsernames = useArrayMap(() => props.dms, ({ members, ...rest }) => ({
  ...rest,
  members: withUsernames(members).memberString,
}))

const mpimsWithUsernames = useArrayMap(() => props.mpims, ({ members, ...rest }) => ({
  ...rest,
  members: withUsernames(members).memberString,
}))
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
    <li v-if="channels.length > 0">
      <NavChannelList :channels="props.channels">
        <template #title>
          {{ $t("channel.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.name }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="dms.length > 0">
      <NavChannelList :channels="dmsWithUsernames">
        <template #title>
          {{ $t("dm.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.members }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="groups.length > 0">
      <NavChannelList :channels="props.groups">
        <template #title>
          {{ $t("group.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.name }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="mpims.length > 0">
      <NavChannelList :channels="mpimsWithUsernames">
        <template #title>
          {{ $t("mpims.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.members }}
        </template>
      </NavChannelList>
    </li>
  </ul>
</template>
