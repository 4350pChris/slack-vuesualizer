<template>
  <div class="w-full max-w-xl">
    <div>
      <div class="w-full flex items-center gap-2 md:gap-4">
        <div v-if="visible" class="relative w-full">
          <input
            type="text"
            placeholder="Search messages"
            class="w-full input font-mono pr-14"
            v-model="query"
            ref="input"
          />
          <button
            class="btn btn-circle btn-ghost absolute right-0"
            @click="visible = false"
            title="close"
          >
            <CloseIcon class="w-6 h-6" />
          </button>
        </div>
        <button
          v-else
          class="btn btn-outline btn-block gap-4"
          @click="visible = true"
        >
          <TextSearch class="w-6 h-6" />
          <span class="font-mono">search messages</span>
          <div class="hidden md:inline-block">
            <kbd class="kbd text-base-content">Ctrl</kbd>
            +
            <kbd class="kbd text-base-content">K</kbd>
          </div>
        </button>
      </div>
      <Transition name="slide-y">
        <div
          v-if="visible"
          class="px-2 pb-2 bg-base-100 lg:border-x absolute top-16 h-[calc(100vh-4rem)] inset-x-0"
        >
          <div class="max-w-xl mx-auto h-full flex flex-col" ref="wrapper">
            <div class="mb-2">
              <h3 class="font-medium text-lg flex-1">
                Search Results for
                <span class="font-bold">"{{ query }}"</span>
                in
                <span class="font-bold">{{
                  allChannels ? "all channels" : route.params.channel
                }}</span>
              </h3>
              <div class="form-control">
                <label class="max-w-max label cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="allChannels"
                    class="checkbox"
                    :disabled="!route.params.channel"
                  />
                  <span class="font-mono label-text whitespace-nowrap ml-4">
                    Search Everywhere
                  </span>
                </label>
              </div>
            </div>
            <Transition name="fade" mode="out-in">
              <div
                v-if="searching"
                class="p-2 bg-base-100 w-full h-full flex justify-center mt-8"
              >
                <LoadingSpinner class="w-12 h-12" />
              </div>
              <MessageResults
                class="min-h-0 overflow-auto"
                v-else
                :results="results"
              />
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import CloseIcon from "~icons/line-md/close";
import TextSearch from "~icons/mdi/text-search";
import type { Message } from "~/types/Message";
import { onKeyDown } from "@vueuse/core";

const route = useRoute();
const query = ref("");
const results = ref<Message[]>([]);
const allChannels = ref(false);
const _searching = ref(false);
const searching = refDebounced(_searching, 150);

const search = useDebounceFn(async () => {
  const params: { query: string; channel?: string | string[] } = {
    query: query.value,
  };
  if (!allChannels.value && route.params.channel) {
    params.channel = route.params.channel;
  }
  try {
    results.value = await $fetch("/api/messages/search", {
      params,
    });
  } catch (e) {
    console.error(e);
  }
  _searching.value = false;
}, 500);

watch([query, allChannels], () => {
  if (!query.value) {
    results.value = [];
    return;
  }
  _searching.value = true;
  return search();
});

whenever(
  () => !route.params.channel,
  () => {
    allChannels.value = true;
  },
  { immediate: true }
);

const wrapper = ref<HTMLElement>(null);
const input = ref<HTMLInputElement>(null);
const visible = ref(false);

whenever(
  () => visible.value && input.value,
  () => {
    unrefElement(input).focus();
  }
);

onClickOutside(wrapper, () => (visible.value = false), {
  ignore: [input],
});

onKeyDown(["Ctrl", "k"], (e) => {
  e.preventDefault();
  visible.value = true;
});

onKeyDown(["Escape"], (e) => {
  e.preventDefault();
  visible.value = false;
});
</script>
