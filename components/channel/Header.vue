<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import ChevronDownIcon from '~icons/mdi/chevron-down'
import type { Topic } from '~/types/Channel'

type Props = {
  created: number
  name: string
  messages: number
  creator?: string
  purpose?: Topic
}

const props = defineProps<Props>()

const users = useUsers()

const created = computed(() => new Date(props.created * 1000))
const creator = computed(() =>
  users.value.find(u => u.id === props.creator),
)
</script>

<template>
  <Disclosure v-slot="{ open }" as="div">
    <DisclosureButton
      class="flex w-full justify-between items-center px-4 py-2 text-left hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
    >
      <h1 class="text-xl font-bold">
        {{ name }}
      </h1>
      <ChevronDownIcon
        class="w-6 h-6 transition"
        :class="{ 'rotate-180': open }"
      />
    </DisclosureButton>
    <Transition name="slide-y">
      <DisclosurePanel class="my-2 flex flex-col gap-2">
        <p v-if="purpose?.value" class="italic">
          {{ purpose.value }}
        </p>
        <p v-if="creator" class="text-sm leading-relaxed capitalize">
          {{
            $t("channel.created", {
              when: created.toLocaleDateString(),
              who: useUserName(creator),
            })
          }}
        </p>
        <p v-if="messages" class="text-sm">
          {{ messages }}
          <span class="capitalize">
            {{ $t("message", 2) }}
          </span>
        </p>
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>
