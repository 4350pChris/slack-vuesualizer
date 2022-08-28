<template>
  <DynamicScroller
    class="h-full"
    :items="messages"
    :min-item-size="64"
    keyField="_id"
    ref="scroller"
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
        <div v-if="item.date" class="divider font-mono text-sm px-4">
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

<script lang="ts" setup>
import type { Message } from "~~/types/Message.js";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

interface Props {
  messages: Array<Message | { date: Date }>;
}

const props = defineProps<Props>();

const scroller = ref(null);
const route = useRoute();

const messageId = computed(() => route.query.message);

onMounted(() => {
  if (messageId.value) {
    const index = props.messages.findIndex(
      (message) => "_id" in message && message._id === messageId.value
    );
    setTimeout(() => scroller.value.scrollToItem(index), 0);
  }
});
</script>
