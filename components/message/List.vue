<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import type { Message } from '~~/types/Message.js'

interface Props {
  messages: Message[]
  hasOlder?: boolean
  loadingOlder?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ loadOlder: [] }>()

const { withSeparators } = useMessages(() => props.messages)
const scroller = ref<any>(null)
const route = useRoute()

const messageId = computed(() => route.query.message)
const restoreHeight = ref<number>()
const previousScrollTop = ref(0)
const restoringScroll = ref(false)

const loadOlder = () => {
  if (!props.hasOlder || props.loadingOlder)
    return

  restoreHeight.value = scroller.value?.$el.scrollHeight
  emit('loadOlder')
}

const onScroll = (event: Event) => {
  const scrollTop = (event.target as HTMLElement).scrollTop
  if (restoringScroll.value) {
    previousScrollTop.value = scrollTop
    return
  }

  if (scrollTop < previousScrollTop.value && scrollTop < 300)
    loadOlder()
  previousScrollTop.value = scrollTop
}

onMounted(async () => {
  if (messageId.value || route.query.at)
    return

  await nextTick()
  scroller.value?.scrollToBottom()
})

watch(() => props.messages, async () => {
  if (restoreHeight.value === undefined)
    return

  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  restoringScroll.value = true
  const element = scroller.value?.$el as HTMLElement | undefined
  if (element)
    element.scrollTop += element.scrollHeight - restoreHeight.value
  requestAnimationFrame(() => (restoringScroll.value = false))
  restoreHeight.value = undefined
})

watchEffect(() => {
  if (messageId) {
    const index = withSeparators.value.items.findIndex(
      message => '_id' in message && (message._id === messageId.value || message.ts === messageId.value),
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
    @scroll="onScroll"
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
          :searched="messageId === item._id || messageId === item.ts"
        />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
