<script lang="ts" setup>
import { onKeyDown } from '@vueuse/core'
import LoadingSpinner from '~icons/line-md/loading-alt-loop'
import CloseIcon from '~icons/line-md/close'
import TextSearch from '~icons/mdi/text-search'

const route = useRoute()

const channel = computed(() => route.params.channel)

const { searching: _searching, allChannels, query, results } = useSearch(channel)

const searching = refDebounced(_searching, 150)

whenever(
  () => !route.params.channel,
  () => {
    allChannels.value = true
  },
  { immediate: true },
)

const wrapper = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const visible = ref(false)

whenever(
  () => visible && input,
  () => {
    unrefElement(input)?.focus()
  },
)

onClickOutside(wrapper, () => (visible.value = false), {
  ignore: [input],
})

const keys = useMagicKeys()

const ctrlK = keys['Ctrl+K']

whenever(ctrlK, () => {
  visible.value = true
})

onKeyDown(['Escape'], (e) => {
  e.preventDefault()
  visible.value = false
})
</script>

<template>
  <div class="w-full max-w-xl">
    <div>
      <Transition name="fade" mode="out-in">
        <div v-if="visible" class="relative w-full">
          <input
            ref="input"
            v-model="query"
            type="text"
            :placeholder="$t('search.messages')"
            class="w-full input font-mono pr-14"
            autofocus
          >
          <button
            class="btn btn-circle btn-ghost absolute right-0"
            :title="$t('close')"
            @click="visible = false"
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
          <span class="font-mono">{{ $t("search.messages") }}</span>
          <div class="hidden md:inline-block">
            <kbd class="kbd text-base-content">Ctrl</kbd>
            +
            <kbd class="kbd text-base-content">K</kbd>
          </div>
        </button>
      </Transition>
      <Transition name="slide-y">
        <div
          v-if="visible"
          class="px-2 pb-2 bg-base-100 lg:border-x border-slate-800/10 dark:border-slate-100/25 absolute top-16 h-[calc(100vh-4rem)] inset-x-0"
        >
          <div ref="wrapper" class="max-w-xl mx-auto h-full flex flex-col">
            <div class="mb-2">
              <i18n-t
                keypath="search.results"
                tag="h3"
                class="capitalize font-medium text-lg flex-1"
                scope="global"
              >
                <span class="font-bold normal-case">"{{ query }}"</span>
                <span>{{
                  $t(
                    "search.channelresults",
                    [route.params.channel],
                    allChannels ? 2 : 1,
                  )
                }}</span>
              </i18n-t>
              <div class="form-control">
                <label class="max-w-max label cursor-pointer">
                  <input
                    v-model="allChannels"
                    type="checkbox"
                    class="checkbox"
                    :disabled="!route.params.channel"
                  >
                  <span
                    class="capitalize font-mono font-medium label-text whitespace-nowrap ml-4"
                  >
                    {{ $t("search.everywhere") }}
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
                v-else
                class="min-h-0 overflow-auto"
                :results="results"
                @close="visible = false"
              />
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
