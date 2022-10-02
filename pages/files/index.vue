<template>
  <div class="flex flex-col gap-4">
    <div class="sticky top-0 bg-base-100 py-2 hidden md:block">
      <FilesFilter
        v-model:users="selectedUsers"
        v-model:channels="selectedChannels"
        v-model:sorting="sorting"
      />
    </div>
    <label
      for="filter-modal"
      class="md:hidden btn btn-primary btn-circle modal-button fixed bottom-4 right-4"
    >
      <span class="sr-only">{{ $t("filter.header") }}</span>
      <i class="i-mdi:filter-variant" aria-hidden="true" />
    </label>
    <Teleport to="body">
      <input type="checkbox" id="filter-modal" class="modal-toggle" />
      <label for="filter-modal" class="modal modal-bottom cursor-pointer">
        <label for="" class="modal-box min-h-[24rem] relative">
          <FilesFilter
            v-model:users="selectedUsers"
            v-model:channels="selectedChannels"
            v-model:sorting="sorting"
          />
        </label>
      </label>
    </Teleport>
    <ul class="list-none space-y-4">
      <li v-for="message in searchResult.messages" :key="message._id">
        <FilesDetailRow :file="message.file" :channel="message.channel" />
      </li>
    </ul>
    <div class="sticky bottom-0 bg-base-100 py-2">
      <BasePagination v-model="page" :pages="searchResult.count" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Sortable } from "~~/types/Sort";
import type { Channel } from "~~/types/Channel";
import type { User } from "~~/types/User";

const selectedUsers = ref<User[]>([]);
const selectedChannels = ref<Channel[]>([]);
const sorting = ref<Sortable>(Sortable.Newest);
const page = ref(0);

const userIds = useArrayMap(selectedUsers, ({ id }) => id);
const channelNames = useArrayMap(selectedChannels, ({ name }) => name);

const { data: searchResult } = useAsyncData(
  "files",
  () =>
    $fetch("/api/files", {
      method: "POST",
      body: {
        users: userIds.value,
        channels: channelNames.value,
        sort: sorting.value,
        page: page.value,
        size: 25,
      },
      headers: useRequestHeaders(["cookie"]),
    }),
  {
    watch: [userIds, channelNames, sorting, page],
  }
);
</script>
