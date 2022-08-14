<template>
  <DynamicScroller
    class="h-full"
    :items="messages"
    :min-item-size="56"
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
        <MessageItem
          :class="{ 'animate-blink': messageId === item._id }"
          :message="item"
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
  messages: Message[];
}

const props = defineProps<Props>();

const scroller = ref(null);
const route = useRoute();

const messageId = computed(() => route.query.message);

onMounted(() => {
  if (messageId.value) {
    const index = props.messages.findIndex(
      ({ _id }) => _id === messageId.value
    );
    setTimeout(() => scroller.value.scrollToItem(index), 0);
  } else {
    scroller.value.scrollToBottom();
  }
});
</script>
