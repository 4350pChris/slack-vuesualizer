<template>
  <div
    class="grid row-auto grid-cols-[3rem,minmax(0,1fr),auto] lg:grid-cols-[4rem,minmax(0,1fr),auto] auto-cols-max gap-2 p-2 py-4 min-h-12 relative"
    :class="{ 'mb-2': message.last_reply, 'animate-blink': searched }"
  >
    <span
      v-if="!disableReplyBar"
      class="absolute left-9"
      :class="{
        'border-l-2 border-slate-800/25 dark:border-slate-400/50':
          message.reply || message.reply_count > 0,
        'h-6': message.last_reply,
        'h-full': !message.last_reply,
      }"
    >
    </span>
    <UserAvatar
      v-if="user"
      class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl"
      :src="user.profile.image_48"
    />
    <div class="flex flex-col flex-1 overflow-hidden col-start-2">
      <p class="font-mono text-sm">
        {{ $d(toTs(message.ts), "long") }}
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
      <p v-else class="text-sm whitespace-pre-wrap">
        {{ message.text }}
      </p>
    </div>
    <SearchIcon v-if="searched" class="w-8 h-8 self-center mr-2" />
    <div class="flex gap-2 col-start-2" v-if="message.reactions">
      <MessageReaction
        v-for="(reaction, i) in message.reactions"
        :key="i"
        :reaction="reaction"
      />
    </div>
    <MessageReplies
      v-if="!simple && message.reply_count > 0"
      class="-ml-6 col-start-2"
      :replyCount="message.reply_count"
      :users="message.reply_users"
    />
    <MessageFiles
      v-if="!simple && message.files"
      class="col-start-2"
      :files="message.files"
    />
  </div>
</template>

<script lang="ts" setup>
import SearchIcon from "~icons/line-md/search";
import type { Message } from "~/types/Message";

interface Props {
  message: Message;
  searched?: boolean;
  simple?: boolean;
  disableReplyBar?: boolean;
}

const props = defineProps<Props>();

const toTs = useTsToDate();
const users = useUsers();

const user = computed(() =>
  users.value.find((u) => u.id === props.message.user)
);
</script>
