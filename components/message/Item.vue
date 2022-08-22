<template>
  <div class="p-2 min-h-12 w-full">
    <div
      class="flex flex-nowrap gap-2 w-full"
      :class="{ 'animate-blink': searched }"
    >
      <UserAvatar
        v-if="user"
        class="w-12 h-12 rounded-xl"
        :src="user.profile.image_48"
      />
      <div class="flex flex-col flex-1 overflow-hidden">
        <p class="font-bold mr-2" v-if="user">
          {{ user.profile.display_name || user.real_name }}
        </p>
        <p class="font-mono text-sm mb-2">
          {{ toTs(message.ts).toLocaleString() }}
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
        <div v-if="!simple && message.files" class="p-2 flex gap-2">
          <div>
            <FileIcon class="w-8 h-8" />
          </div>
          <div>
            <div class="font-bold mb-2">Files</div>
            <ul v-for="file in message.files" :key="file.id">
              <li>
                <a
                  v-if="file.url_private"
                  class="link"
                  :href="file.url_private"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ file.name }}</span>
                </a>
                <span v-else>{{ file.mode }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SearchIcon v-if="searched" class="w-8 h-8" />
    </div>
    <MessageReplies
      v-if="!simple && message.replies"
      :replies="message.replies"
      :users="message.reply_users"
    />
  </div>
</template>

<script lang="ts" setup>
import FileIcon from "~icons/mdi/file";
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
