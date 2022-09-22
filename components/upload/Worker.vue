<template>
  <div class="w-full">
    <progress
      class="mb-4 progress w-full animate-blink"
      :value="(errors.size + done.size / channels.length) * 100"
      max="100"
    />
    <button
      v-if="retriable"
      class="btn btn-outline btn-primary btn-block"
      @click="doUpload"
    >
      {{ $t("retry") }}
    </button>
    <ul class="list-none space-y-2">
      <li
        v-for="channel in ['workspace', ...channels]"
        :key="channel"
        class="flex gap-2 justify-center items-center w-max"
      >
        <ConfirmIcon v-if="done.has(channel)" class="w-5 h-5 text-success" />
        <AlertIcon v-else-if="errors.has(channel)" class="w-5 h-5 text-error" />
        <UploadingLoopIcon v-else-if="queue.has(channel)" class="w-5 h-5" />
        <CircleIcon v-else class="w-5 h-5" />
        <span>{{
          channel === "workspace" ? $t("workspace.word") : channel
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ConfirmIcon from "~icons/line-md/confirm-circle";
import AlertIcon from "~icons/line-md/alert-circle";
import CircleIcon from "~icons/line-md/circle";
import UploadingLoopIcon from "~icons/line-md/uploading-loop";
import { Sema } from "async-sema";

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
const errors = ref(new Set<string>());
const retriable = ref(false);

const sema = new Sema(3);

const uploadChannel = async (channel: string) => {
  try {
    await sema.acquire();
    queue.value.add(channel);
    await $fetch(`/api/import/${props.fileName}/channel/${channel}`, {
      method: "POST",
    });
    done.value.add(channel);
  } catch (e) {
    errors.value.add(channel);
  } finally {
    queue.value.delete(channel);
    sema.release();
  }
};

const uploadOtherFiles = async () => {
  try {
    queue.value.add("workspace");
    await $fetch(`/api/import/${props.fileName}`, {
      method: "POST",
    });
    done.value.add("workspace");
  } catch (e) {
    errors.value.add("workspace");
  } finally {
    queue.value.delete("workspace");
  }
};

const doUpload = async () => {
  retriable.value = false;

  if (!token.value) {
    await uploadOtherFiles();
  }

  const channelsToUpload = props.channels.filter(
    (channel) => !done.value.has(channel)
  );

  await Promise.all(channelsToUpload.map(uploadChannel));

  if (done.value.size === props.channels.length + 1) {
    emit("done", token.value);
  } else {
    retriable.value = true;
  }
};

onMounted(doUpload);
</script>
