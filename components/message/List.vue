<template>
  <DynamicScroller
    class="h-full"
    :items="messages"
    :min-item-size="48"
    keyField="_id"
    ref="scroller"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.replies, item.files, item.text]"
        :data-index="index"
      >
        <MessageItem :message="item" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script lang="ts" setup>
import type { Message } from "~~/types/Message.js";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

interface Props {
  messages: Message[];
}

defineProps<Props>();

const scroller = ref(null);

onMounted(() => {
  scroller.value.scrollToBottom();
});
</script>
