<script lang="ts" setup>
import { RecycleScroller } from 'vue-virtual-scroller';

type Item = {
  name: string,
  label?: string
}

type Props = {
  listItems: Item[]
}

defineProps<Props>()
</script>

<template>
  <RecycleScroller class="h-full" :items="listItems" :item-size="56" key-field="id" v-slot="{ item }">
    <NuxtLinkLocale
      class="h-12 p-4 my-1 rounded-box flex items-center channel-link transition-colors hover:bg-base-200/50 dark:hover:bg-slate-200/10"
      :to="`/channels/${item.name}`">
      <ChannelTitle :title="item.label ?? item.name" />
    </NuxtLinkLocale>
  </RecycleScroller>
</template>

<style scoped>
:deep(.vue-recycle-scroller__item-wrapper) {
  @apply divide-y divide-slate-300 dark:divide-gray-500;
}
</style>
