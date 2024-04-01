<script lang="ts" setup>
import type { Dm } from '~/types/Dm';

const { dms, properChannels, mpims, groups } = useChannels()
const { withUsernames } = useWithUsernames()

const query = useState('channels-query', () => '')

const tabs = computed(() => [
  { name: 'Channels', channels: properChannels.value },
  { name: 'Groups', channels: groups.value },
  { name: 'DMs', channels: dms.value },
  { name: 'Private Groups', channels: mpims.value },
].filter(({ channels }) => channels.length > 0))

const selectedTab = ref(tabs.value[0])

const filterChannelsByQuery = (channels: Dm[], query: string) =>
  channels.filter(({ name }) => query.length === 0 || name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
</script>

<template>
  <section class="flex flex-col gap-4 pt-4 h-full">
    <input v-model="query" type="text" :placeholder="$t('search.channels')"
      class="flex-none w-full max-w-lg input input-bordered">
    <div role="tablist" class="tabs tabs-lifted">
      <template v-for="tab in tabs" :key="tab.name">
        <input name="channel_tabs" role="tab" type="radio" class="tab"
          :class="{ 'tab-active': selectedTab.name === tab.name }" :aria-label="tab.name" @change="selectedTab = tab" />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <template v-if="selectedTab.name === tab.name">
            <NuxtLinkLocale v-for="channel in filterChannelsByQuery(tab.channels, query)" :key="channel.id"
              class="h-12 p-4 rounded-box flex items-center channel-link hover:bg-base-200/50 dark:hover:bg-slate-200/10"
              :to="`/channels/${channel.name}`">
              {{ channel.name }}
            </NuxtLinkLocale>
          </template>
        </div>
      </template>
    </div>
  </section>
</template>
