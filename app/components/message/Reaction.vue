<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import type { Reaction } from '~/types/Message'

interface Props {
  reaction: Reaction
}

const props = defineProps<Props>()

const name = computed(() => props.reaction.name)

const { emojiUnicode } = useEmoji(name)

const { withUsernames } = useWithUsernames()

const keyedMembers = computed(() => withUsernames(props.reaction.users).keyedMembers)
</script>

<template>
  <Popover class="relative">
    <PopoverButton class="badge badge-ghost">
      <span v-html="emojiUnicode" />
      <span class="ml-1">{{ reaction.count }}</span>
    </PopoverButton>
    <Transition name="slide-y">
      <PopoverPanel
        class="absolute z-10 text-sm left-1/2 -translate-x-1/2 py-2 px-4 bg-base-100 text-base-content rounded-lg shadow-lg leading-relaxed ring-1 ring-black/10 dark:ring-slate-300/25">
        <div v-for="user in keyedMembers.usernames" :key="user">
          {{ user }}
        </div>
        <div v-if="keyedMembers.unknown > 0">
          {{ $t('user.unknown', keyedMembers.unknown) }}
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>
