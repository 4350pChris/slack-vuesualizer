<template>
  <div class="w-full">
    <progress
      class="mb-4 progress w-full animate-blink"
      :value="((errors.size + done.size) / (channels.length + 2)) * 100"
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
        v-for="channel in [
          'vuesualizer-workspace',
          ...channels,
          'vuesualizer-delete',
        ]"
        :key="channel"
        class="flex gap-2 justify-start items-center"
      >
        <ConfirmIcon v-if="done.has(channel)" class="w-5 h-5 text-success" />
        <AlertIcon v-else-if="errors.has(channel)" class="w-5 h-5 text-error" />
        <UploadingLoopIcon v-else-if="queue.has(channel)" class="w-5 h-5" />
        <CircleIcon v-else class="w-5 h-5" />
        <span v-if="channel === 'vuesualizer-workspace'">
          {{ $t("workspace.word") }}
        </span>
        <span v-else-if="channel === 'vuesualizer-delete'">
          {{ $t("upload.delete") }}
        </span>
        <span v-else>{{ channel }}</span>
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

const uploadWorkspaceData = async () => {
  try {
    queue.value.add("vuesualizer-workspace");
    const { uuid } = (await $fetch(`/api/import/${props.fileName}/workspace`, {
      method: "POST",
    })) as { uuid: string };
    token.value = uuid;
    done.value.add("vuesualizer-workspace");
  } catch (e) {
    errors.value.add("vuesualizer-workspace");
  } finally {
    queue.value.delete("vuesualizer-workspace");
  }
};

const deleteZip = async () => {
  try {
    queue.value.add("vuesualizer-delete");
    const baseUrl = `/api/import/${props.fileName}/workspace`;
    await $fetch(baseUrl, {
      method: "DELETE",
    });
    done.value.add("vuesualizer-delete");
  } catch (e) {
    errors.value.add("vuesualizer-delete");
  } finally {
    queue.value.delete("vuesualizer-delete");
  }
};

const doUpload = async () => {
  retriable.value = false;

  if (!done.value.has("vuesualizer-workspace")) {
    await uploadWorkspaceData();
  }

  const channelsToUpload = props.channels.filter(
    (channel) => !done.value.has(channel)
  );

  await Promise.all(channelsToUpload.map(uploadChannel));

  await deleteZip();

  if (done.value.size === props.channels.length + 2) {
    emit("done", token.value);
  } else {
    retriable.value = true;
  }
};

onMounted(doUpload);
</script>
