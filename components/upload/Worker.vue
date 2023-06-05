<script lang="ts" setup>
import type { Entry } from '@zip.js/zip.js'
import ConfirmIcon from '~icons/line-md/confirm-circle'
import AlertIcon from '~icons/line-md/alert-circle'
import CircleIcon from '~icons/line-md/circle'
import UploadingLoopIcon from '~icons/line-md/uploading-loop'

interface Props {
  entries: Entry[]
  channels: string[]
}

interface Emits {
  (event: 'done'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { queue, list, done, errors, retriable, doUpload } = useUpload()

watchEffect(() => {
  const channel = props.channels.filter(c => queue.value.has(c)).at(-1)

  if (!channel)
    return

  const position = props.channels.lastIndexOf(channel)

  const childEl = unrefElement(list)?.children[position]

  childEl?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
})

const handleUpload = async () => {
  const success = await doUpload(props.channels, props.entries)

  if (success)
    emit('done')
}

onMounted(handleUpload)
</script>

<template>
  <div class="w-full">
    <div class="sticky inset-x-0 top-36 z-10 pb-4 bg-base-100">
      <progress
        class="progress w-full"
        :value="((errors.size + done.size) / (channels.length + 1)) * 100"
        max="100"
      />
    </div>
    <ul ref="list" class="list-none space-y-2">
      <li
        v-for="channel in ['vuesualizer-workspace', ...channels]"
        :key="channel"
        class="flex gap-2 justify-start items-center"
      >
        <UploadingLoopIcon v-if="queue.has(channel)" class="w-5 h-5" />
        <ConfirmIcon
          v-else-if="done.has(channel)"
          class="w-5 h-5 text-success"
        />
        <AlertIcon v-else-if="errors.has(channel)" class="w-5 h-5 text-error" />
        <CircleIcon v-else class="w-5 h-5" />
        <span v-if="channel === 'vuesualizer-workspace'">
          {{ $t("workspace.word") }}
        </span>
        <span v-else>{{ channel }}</span>
      </li>
    </ul>
    <Transition name="fade">
      <div
        v-if="retriable"
        class="sticky bottom-0 -mb-4 bg-base-100 py-4 border-t"
      >
        <button class="btn btn-outline btn-primary btn-block" @click="handleUpload">
          {{ $t("retry") }}
        </button>
      </div>
    </Transition>
  </div>
</template>
