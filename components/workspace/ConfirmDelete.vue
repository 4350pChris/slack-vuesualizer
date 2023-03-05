<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

defineEmits<{
  (event: 'confirm'): void
}>()

const { t } = useI18n()

const confirmInput = $ref('')

const confirmDisabled = $computed(() => {
  return confirmInput !== t('workspace.delete.button')
})
</script>

<template>
  <form class="flex flex-col justify-center items-center gap-4 max-w-sm mx-auto" @submit.prevent="$emit('confirm')">
    <i18n-t keypath="workspace.delete.confirm" tag="p">
      <span class="font-bold">{{ $t('workspace.delete.button') }}</span>
    </i18n-t>
    <input v-model="confirmInput" class="input input-bordered" type="text" :placeholder="$t('workspace.delete.button')">
    <button class="btn btn-error" :disabled="confirmDisabled" type="submit">
      {{ $t('workspace.delete.button') }}
    </button>
  </form>
</template>
