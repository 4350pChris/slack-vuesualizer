<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import type { Message } from '~/types/Message'

interface Props {
  messages: Message[]
  focusTs?: string
  hasOlder?: boolean
  hasNewer?: boolean
  loadingOlder?: boolean
  loadingNewer?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ loadOlder: []; loadNewer: []; olderRestored: [] }>()

type Separator = { date: Date; _id: number }

const isSeparator = (item: Message | Separator): item is Separator => 'date' in item

const { withSeparators } = useMessages(() => props.messages)
const scroller = ref<any>(null)
const route = useRoute()

const messageId = computed(() => route.query.message?.toString())
const scrollTarget = computed(() => messageId.value ?? props.focusTs)
const pendingOlderTrim = ref(false)
const scrollToBottomAfterLoad = ref(false)
const previousScrollTop = ref(0)
const restoringScroll = ref(false)

const loadOlder = () => {
  if (!props.hasOlder || props.loadingOlder)
    return

  pendingOlderTrim.value = true
  emit('loadOlder')
}

const loadNewer = () => {
  if (!props.hasNewer || props.loadingNewer)
    return

  scrollToBottomAfterLoad.value = true
  emit('loadNewer')
}

const onScroll = (event: Event) => {
  const scrollTop = (event.target as HTMLElement).scrollTop
  if (restoringScroll.value) {
    previousScrollTop.value = scrollTop
    return
  }

  if (scrollTop < previousScrollTop.value && scrollTop < 300)
    loadOlder()
  if (scrollTop > previousScrollTop.value
    && scrollTop + (event.target as HTMLElement).clientHeight > (event.target as HTMLElement).scrollHeight - 300) {
    loadNewer()
  }
  previousScrollTop.value = scrollTop
}

onMounted(async () => {
  await nextTick()
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  if (!scrollTarget.value) {
    scroller.value?.scrollToBottom()
    return
  }

  const index = withSeparators.value.items.findIndex(
    message => !isSeparator(message) && (message._id === scrollTarget.value || message.ts === scrollTarget.value),
  )
  if (index < 0 || !scroller.value)
    return

  restoringScroll.value = true
  scroller.value.scrollToItem(index)
  requestAnimationFrame(() => {
    const element = scroller.value?.$el as HTMLElement | undefined
    if (element)
      element.scrollTop -= element.clientHeight / 2
    requestAnimationFrame(() => (restoringScroll.value = false))
  })
})

watch(() => props.messages, async () => {
  if (pendingOlderTrim.value) {
    await nextTick()
    pendingOlderTrim.value = false
    emit('olderRestored')
  }
  else if (scrollToBottomAfterLoad.value) {
    await nextTick()
    restoringScroll.value = true
    scroller.value?.scrollToBottom()
    requestAnimationFrame(() => (restoringScroll.value = false))
    scrollToBottomAfterLoad.value = false
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
    shift
    @scroll="onScroll"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :data-index="index"
      >
        <div v-if="isSeparator(item)" class="divider font-mono text-sm my-2 px-4">
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
