<script lang="ts" setup>
import type { Sortable } from '~~/types/Sort'
import type { Channel } from '~~/types/Channel'
import type { User } from '~~/types/User'

interface Props {
  channels: Channel[]
  users: User[]
  sorting: Sortable
}

interface Emits {
  (event: 'update:channels', payload: Channel[]): void
  (event: 'update:users', payload: User[]): void
  (event: 'update:sorting', payload: Sortable): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const { channels, users, sorting } = useVModels(props, emit)
</script>

<template>
  <form class="flex flex-wrap justify-between gap-4">
    <fieldset class="space-y-2 flex-1 capitalize">
      <legend class="text-sm font-bold">
        {{ $t("filter.header") }}
      </legend>
      <div class="flex flex-wrap justify-start gap-2">
        <UserMultiSelect v-model="users" />
        <ChannelMultiSelect v-model="channels" />
      </div>
    </fieldset>
    <fieldset class="space-y-2 capitalize">
      <legend class="text-sm font-bold">
        {{ $t("filter.sort") }}
      </legend>
      <BaseSort v-model="sorting" />
    </fieldset>
  </form>
</template>
