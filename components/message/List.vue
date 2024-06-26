<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import type { Message } from '~~/types/Message.js'

interface Props {
  messages: Message[]
}

const props = defineProps<Props>()

const { withSeparators } = useMessages(() => props.messages)
const scroller = ref<any>(null)
const route = useRoute()

const messageId = computed(() => route.query.message)

watchEffect(() => {
  if (messageId) {
    const index = withSeparators.value.items.findIndex(
      message => '_id' in message && message._id === messageId.value,
    )
    setTimeout(() => scroller.value?.scrollToItem(index), 0)
  }
})
</script>

<template>
  <DynamicScroller
    ref="scroller"
    class="h-full"
    :items="withSeparators.items"
    :min-item-size="64"
    key-field="_id"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[
          item.files,
          item.text,
          item.blocks,
          item.reactions,
          item.last_reply,
        ]"
        :data-index="index"
      >
        <div v-if="item.date" class="divider font-mono text-sm my-2 px-4">
          {{ $d(item.date, "short") }}
        </div>
        <MessageItem
          v-else
          :message="item"
          :searched="messageId === item._id"
        />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
