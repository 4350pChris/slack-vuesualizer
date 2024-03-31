<script lang="ts" setup>
import SearchIcon from '~icons/line-md/search'
import type { Message } from '~/types/Message'

interface Props {
  message: Message
  searched?: boolean
  simple?: boolean
  disableReplyBar?: boolean
}

const props = defineProps<Props>()

const toTs = useTsToDate()
const users = useUsers()

const user = computed(() =>
  users.value.find(
    u => u.id === props.message.user || u.id === props.message.bot_id,
  ),
)

const hasReplies = computed(() => (props.message.reply_count ?? 0) > 0)

const timestamp = computed(() => toTs(props.message.ts))
</script>

<template>
  <div
    class="grid row-auto grid-cols-[3rem,minmax(0,1fr),auto] lg:grid-cols-[4rem,minmax(0,1fr),auto] auto-cols-max gap-2 px-2 py-4 min-h-12 relative"
    :class="{ 'mb-2': message.last_reply, 'animate-blink': searched }">
    <span v-if="!disableReplyBar" class="absolute left-9" :class="{
      'border-l-2 border-slate-800/25 dark:border-slate-400/50 h-full':
        message.reply || hasReplies,
      '!h-6': message.last_reply,
      'top-4 !h-[calc(100%-1rem)]': hasReplies,
    }" />
    <UserAvatar class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl" :src="user?.profile?.image_48" />
    <div class="flex flex-col flex-1 overflow-hidden col-start-2">
      <p class="mb-2">
        <span v-if="user" class="font-bold mr-4">
          {{ useUserName(user) }}
        </span>
        <span v-if="timestamp" class="font-mono text-sm">
          {{ $d(timestamp, "long") }}
        </span>
      </p>
      <template v-if="message.blocks?.length">
        <MessageBlock v-for="(section, i) in message.blocks" :key="i" :node="section" />
      </template>
      <p v-else class="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
        {{ message.text }}
      </p>
    </div>
    <SearchIcon v-if="searched" class="w-8 h-8 self-center mr-2" />
    <div v-if="message.reactions" class="flex gap-2 col-start-2 flex-wrap">
      <MessageReaction v-for="(reaction, i) in message.reactions" :key="i" :reaction="reaction" />
    </div>
    <MessageReplies v-if="!simple && hasReplies" class="col-start-2" :reply-count="message.reply_count"
      :users="message.reply_users" />
    <MessageFiles v-if="!simple && message.files" class="col-start-2" :files="message.files" />
    <MessageAttachments v-if="!simple && message.attachments" class="col-start-2" :attachments="message.attachments" />
  </div>
</template>
