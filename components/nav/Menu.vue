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
}

const props = defineProps<Props>()

const users = useUsers()

const findUser = (id: string) => users.value.find(u => u.id === id)

const dmsWithUsernames = computed(() => props.dms.map(
  ({ members, ...dm }) => ({
    ...dm,
    name: dm.id,
    members: members.map(id => findUser(id)).filter(Boolean) as User[],
  }),
))
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
          {{ channel.members.map(u => useUserName(u)).join(", ") }}
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
  </ul>
</template>
