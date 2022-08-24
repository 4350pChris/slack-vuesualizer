<template>
  <div
    class="flex flex-col gap-2 p-2 py-4 min-h-12 relative"
    :class="{ 'mb-2': message.last_reply }"
  >
    <span
      class="h-full absolute left-8"
      :class="{
        'border-l-2 border-slate-800/25 dark:border-slate-400/50':
          !message.last_reply && (message.reply || message.reply_count > 0),
      }"
    >
    </span>
    <div
      class="flex flex-nowrap gap-2 w-full"
      :class="{ 'animate-blink': searched }"
    >
      <UserAvatar
        v-if="user"
        class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl"
        :src="user.profile.image_48"
      />
      <div class="flex flex-col flex-1 overflow-hidden">
        <p class="font-mono text-sm">
          {{ toTs(message.ts).toLocaleString() }}
        </p>
        <p class="font-bold mb-2" v-if="user">
          {{ user.profile.display_name || user.real_name }}
        </p>
        <template v-if="message.blocks?.length">
          <MessageBlock
            v-for="(section, i) in message.blocks"
            :key="i"
            :node="section"
          />
        </template>
        <p v-else class="text-sm font-mono whitespace-pre-wrap">
          {{ message.text }}
        </p>
        <div class="flex gap-2">
          <MessageReaction
            v-for="(reaction, i) in message.reactions"
            :key="i"
            :reaction="reaction"
          />
        </div>
      </div>
      <SearchIcon v-if="searched" class="w-8 h-8" />
    </div>
    <MessageFiles v-if="!simple && message.files" :files="message.files" />
  </div>
</template>

<script lang="ts" setup>
import SearchIcon from "~icons/line-md/search";
import type { Message } from "~/types/Message";

interface Props {
  message: Message;
  searched?: boolean;
  simple?: boolean;
}

const props = defineProps<Props>();

const toTs = useTsToDate();
const users = useUsers();

const user = computed(() =>
  users.value.find((u) => u.id === props.message.user)
);
</script>
