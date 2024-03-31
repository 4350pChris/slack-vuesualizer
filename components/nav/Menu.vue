<script lang="ts" setup>
import type { Dm } from '~/types/Dm'
import type { User } from '~/types/User'
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

const users = useUsers()

const findUser = (id: string) => users.value.find(u => u.id === id)

const withUsernames = <T extends Dm>(channel: T) => ({
  ...channel,
  members: channel.members.map(id => {
    const user = findUser(id)
    if (user) {
      return useUserName(user)
    }
  }).filter(Boolean).join(", "),
})

const dmsWithUsernames = useArrayMap(() => props.dms, (dm) => ({
  ...withUsernames(dm),
  name: dm.id
}))
const mpimsWithUsernames = useArrayMap(() => props.mpims, withUsernames)
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
        {{ $t("user", 2) }}
      </NuxtLinkLocale>
    </li>
    <li>
      <NuxtLinkLocale class="capitalize rounded-box" to="/files">
        <FilesIcon />
        {{ $t("file", 2) }}
      </NuxtLinkLocale>
    </li>
    <li v-if="channels.length > 0">
      <NavChannelList :channels="props.channels" type="channels">
        <template #title>
          {{ $t("channel.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.name }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="dms.length > 0">
      <NavChannelList :channels="dmsWithUsernames" type="dms">
        <template #title>
          {{ $t("dm.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.members }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="groups.length > 0">
      <NavChannelList :channels="props.groups" type="groups">
        <template #title>
          {{ $t("group.word", 2) }}
        </template>
        <template #channel="{ channel }">
          {{ channel.name }}
        </template>
      </NavChannelList>
    </li>
    <li v-if="mpims.length > 0">
      <NavChannelList :channels="mpimsWithUsernames" type="private-channels">
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
