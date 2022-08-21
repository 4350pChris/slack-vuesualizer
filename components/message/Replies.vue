<template>
  <Disclosure as="div" v-slot="{ open }">
    <DisclosureButton
      class="flex w-full justify-between items-center px-4 py-2 text-left hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
    >
      <div class="avatar-group -space-x-4">
        <UserAvatar
          v-for="user in users.slice(0, 3)"
          :key="user"
          class="w-8"
          :src="getUserImage(user)"
        />
        <div v-if="users.length > 3" class="avatar placeholder">
          <div class="w-8 bg-neutral text-neutral-content">
            <span>+ {{ users.length - 3 }}</span>
          </div>
        </div>
      </div>
      <span class="font-bold">Replies ({{ replies.length }})</span>
      <ChevronDownIcon
        class="w-6 h-6 transition"
        :class="{ 'rotate-180': open }"
      />
    </DisclosureButton>
    <Transition name="slide-y">
      <DisclosurePanel>
        <MessageList :messages="replies" />
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import ChevronDownIcon from "~icons/mdi/chevron-down";
import type { Message } from "~/types/Message";

interface Props {
  replies: Message[];
  users: Message["reply_users"];
}

defineProps<Props>();

const localUsers = useUsers();

const getUserImage = (id: string) =>
  localUsers.value.find((user) => user.id === id)?.profile.image_48;
</script>
