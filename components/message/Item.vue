<template>
  <div
    class="flex flex-nowrap gap-2 min-h-12 p-2 w-full"
    :class="{ 'animate-blink': searched }"
  >
    <UserAvatar v-if="user" :src="user.profile.image_48" />
    <div class="flex flex-col gap-2 flex-1">
      <div>
        <span class="font-bold mr-2" v-if="user">{{
          user.profile.display_name || user.name
        }}</span>
        <span class="font-light">{{ toTs(message.ts).toLocaleString() }}</span>
      </div>
      <p>{{ message.text }}</p>
      <div v-if="message.files" class="p-2 flex gap-2">
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
      <div
        v-if="message.replies"
        class="collapse collapse-arrow bg-base-300 rounded-box"
      >
        <input type="checkbox" />
        <div class="collapse-title font-bold">Replies</div>
        <div class="collapse-content">
          <MessageList :messages="message.replies" />
        </div>
      </div>
    </div>
    <SearchIcon v-if="searched" class="w-8 h-8" />
  </div>
</template>

<script lang="ts" setup>
import FileIcon from "~icons/mdi/file";
import SearchIcon from "~icons/line-md/search";
import type { Message } from "~/types/Message";

interface Props {
  message: Message;
  searched: boolean;
}

const props = defineProps<Props>();

const toTs = useTsToDate();
const users = useUsers();

const user = computed(() =>
  users.value.find((u) => u.id === props.message.user)
);
</script>
