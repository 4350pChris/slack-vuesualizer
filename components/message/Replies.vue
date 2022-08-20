<template>
  <Disclosure as="div" v-slot="{ open }">
    <DisclosureButton
      class="flex w-full justify-between items-center px-4 py-2 text-left hover:bg-base-200 transition rounded-box"
    >
      <span class="font-bold"> Replies </span>
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
}

const props = defineProps<Props>();
</script>
