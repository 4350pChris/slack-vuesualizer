<template>
  <ul class="list-none space-y-2">
    <li
      v-for="channel in channels"
      :key="channel"
      class="flex gap-2 justify-center items-center w-max"
    >
      <div
        class="swap cursor-auto"
        :class="{ 'swap-active': done.has(channel) }"
      >
        <ConfirmIcon class="w-5 h-5 swap-on" />
        <UploadingLoopIcon class="w-5 h-5 swap-off" />
      </div>
      <span>{{ channel }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import ConfirmIcon from "~icons/line-md/confirm";
import UploadingLoopIcon from "~icons/line-md/uploading-loop";

interface Props {
  channels: string[];
  fileName: string;
}

interface Emits {
  (event: "done", token: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const queue = ref(new Set<string>());
const done = ref(new Set<string>());
const token = ref("");

const uploadChannel = async (channel: string) => {
  queue.value.add(channel);
  await $fetch(`/api/import/${props.fileName}/channel/${channel}`, {
    method: "POST",
  });
  queue.value.delete(channel);
  done.value.add(channel);
};

const uploadOtherFiles = async () => {
  await $fetch(`/api/import/${props.fileName}`, {
    method: "POST",
  });
};

onMounted(async () => {
  await uploadOtherFiles();
  const chunkSize = 5;
  const chunks = props.channels.reduce((acc, channel, i) => {
    const bucket = Math.floor(i / chunkSize);
    if (acc[bucket] === undefined) {
      acc.push([]);
    }
    acc[bucket].push(channel);
    return acc;
  }, [] as string[][]);
  for (const chunk of chunks) {
    await Promise.all(chunk.map(uploadChannel));
  }
});

whenever(
  () => done.value.size === props.channels.length,
  () => emit("done", token.value)
);
</script>
