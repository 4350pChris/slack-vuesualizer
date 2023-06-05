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
}

const props = defineProps<Props>()

const users = useUsers()

const findUser = (id: string) => users.value.find(u => u.id === id)

const dmsWithUsernames = computed(() => props.dms.map(
  ({ members, ...dm }) => ({
    ...dm,
    members: members.map(id => findUser(id)).filter(Boolean) as User[],
  }),
))
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
    <li>
      <details open>
        <summary class="capitalize">
          {{ $t("channel.word", 2) }}
        </summary>
        <ul>
          <li v-for="channel in channels" :key="channel.id" class="rounded-box">
            <NuxtLink class="rounded-box" :to="`/channels/${channel.name}`">
              {{ channel.name }}
            </NuxtLink>
          </li>
        </ul>
      </details>
    </li>
    <li v-if="dms">
      <details open>
        <summary class="capitalize">
          {{ $t("dm.word", 2) }}
        </summary>
        <ul>
          <li v-for="dm in dmsWithUsernames" :key="dm.id" class="rounded-box">
            <NuxtLink class="rounded-box" :to="`/channels/${dm.id}`">
              {{ dm.members.map(u => useUserName(u)).join(", ") }}
            </NuxtLink>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>
