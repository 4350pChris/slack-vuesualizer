<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import type { Message } from '~~/types/Message.js'

interface Props {
  messages: Array<Message | { date: Date }>
}

const props = defineProps<Props>()

const scroller = ref(null)
const route = useRoute()

const messageId = computed(() => route.query.message)

watchEffect(() => {
  if (messageId.value) {
    const index = props.messages.findIndex(
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
    :items="messages"
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
