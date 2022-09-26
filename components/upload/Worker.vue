<template>
  <div class="w-full">
    <div class="sticky top-36 pb-4 bg-base-100">
      <progress
        class="progress w-full"
        :value="((errors.size + done.size) / (channels.length + 1)) * 100"
        max="100"
      />
    </div>
    <ul class="list-none space-y-2" ref="list">
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
        <button class="btn btn-outline btn-primary btn-block" @click="doUpload">
          {{ $t("retry") }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import ConfirmIcon from "~icons/line-md/confirm-circle";
import AlertIcon from "~icons/line-md/alert-circle";
import CircleIcon from "~icons/line-md/circle";
import UploadingLoopIcon from "~icons/line-md/uploading-loop";
import { Sema } from "async-sema";
import type { Entry } from "@zip.js/zip.js";

interface Props {
  entries: Entry[];
  channels: string[];
}

interface Emits {
  (event: "done"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const queue = ref(new Set<string>());
const done = ref(new Set<string>());
const errors = ref(new Set<string>());
const retriable = ref(false);

const { parseData } = useZip();

const list = ref<HTMLElement>();

const sema = new Sema(3);

const uploadChannel = async (channel: string) => {
  try {
    await sema.acquire();
    queue.value.add(channel);
    const channelEntries = props.entries.filter(
      (e) => !e.directory && e.filename.startsWith(`${channel}/`)
    );

    const data = await parseData(channelEntries);

    // split into groups to prevent request from being too large for Vercel to handle
    const groups = [];
    const size = 500;

    for (let i = 0; i < data.length; i += size) {
      groups.push(data.slice(i, i + size));
    }

    await Promise.all(
      groups.map((group) =>
        $fetch(`/api/import/channel/${channel}`, {
          method: "POST",
          body: { data: group },
        })
      )
    );

    done.value.add(channel);
  } catch (e) {
    errors.value.add(channel);
  } finally {
    queue.value.delete(channel);
    sema.release();
  }
};

watchEffect(() => {
  const channel = props.channels.filter((c) => queue.value.has(c)).at(-1);

  const position = props.channels.lastIndexOf(channel);

  const childEl = unrefElement(list)?.children[position];

  childEl?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

const uploadWorkspaceData = async () => {
  try {
    queue.value.add("vuesualizer-workspace");
    const workspaceEntries = props.entries.filter(
      (e) => !e.filename.includes("/") && !e.directory
    );
    let data = await Promise.all(
      workspaceEntries.map(async (e) => ({
        name: e.filename.split(".json")[0],
        data: await parseData([e]),
      }))
    );

    // remove channels that are not to be imported
    data = data.map((d) => {
      if (d.name !== "channels") {
        return d;
      }
      d.data = d.data.filter((c) => props.channels.includes(c.name));
      return d;
    });

    await $fetch(`/api/import/workspace`, {
      method: "POST",
      body: { data },
    });

    done.value.add("vuesualizer-workspace");
  } catch (e) {
    errors.value.add("vuesualizer-workspace");
    throw e;
  } finally {
    queue.value.delete("vuesualizer-workspace");
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

  if (done.value.size === props.channels.length + 1) {
    emit("done");
  } else {
    retriable.value = true;
  }
};

onMounted(doUpload);
</script>
