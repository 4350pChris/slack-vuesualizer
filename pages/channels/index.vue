<script lang="ts" setup>
import type { Dm } from '~/types/Dm';

type TabChannel = Dm & { label?: string }

type Tab = {
  name: string
  channels: TabChannel[]
}

const { dms, properChannels, mpims, groups } = useChannels()
const { withUsernames } = useWithUsernames()

const query = useState('channels-query', () => '')

const { t } = useI18n()

const tabs = computed<Tab[]>(() => [
  { name: t("channel.word", 3), channels: properChannels.value },
  { name: t("group.word", 3), channels: groups.value },
  {
    name: t("dm.word", 3), channels: dms.value.map((dm) => ({
      ...dm,
      label: withUsernames(dm.members).memberString
    }))
  },
  {
    name: t("mpims.word", 3), channels: mpims.value.map((mpim) => ({
      ...mpim,
      label: withUsernames(mpim.members).memberString
    }))
  },
].filter(({ channels }) => channels.length > 0))

const getDisplayedLabel = (channel: TabChannel): string => channel.label ?? channel.name

const selectedTabs = ref([0])

const filterChannelsByQuery = <T extends Dm>(channels: T[], query: string) =>
  channels.filter((channel) => query.length === 0 || getDisplayedLabel(channel).toLocaleLowerCase().includes(query))

const filteredChannels = useArrayMap(tabs, ({ channels }) => filterChannelsByQuery(channels, query.value))

const listItems = computed(() => {
  return selectedTabs.value.flatMap((i) => filteredChannels.value[i]).sort((a, b) => getDisplayedLabel(a).localeCompare(getDisplayedLabel(b)))
})
</script>

<template>
  <section class="flex flex-col gap-4 pt-4 h-full">
    <input v-model="query" type="text" :placeholder="$t('search.channels')"
      class="flex-none w-full max-w-lg input input-bordered">
    <div class="flex flex-row flex-wrap gap-4">
      <template v-for="(tab, i) in tabs" :key="tab.name">
        <input type="checkbox" :id="tab.name" :value="i" v-model="selectedTabs" class="hidden">
        <label
          class="px-4 py-1 text-base-content ring-1 ring-black/10 dark:ring-slate-300/25 hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
          :class="{ 'bg-primary text-primary-content hover:bg-primary/30 dark:hover:bg-primary/60 hover:text-base-content': selectedTabs.includes(i) }"
          :for="tab.name">
          {{ tab.name }} ({{ filteredChannels[i].length }})
        </label>
      </template>
    </div>
    <ChannelList :listItems="listItems" />
  </section>
</template>
