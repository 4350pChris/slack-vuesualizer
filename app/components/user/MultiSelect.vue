<script lang="ts" setup>
import type { User } from '~~/types/User'

interface Props {
  modelValue: User[]
}

interface Emits {
  (event: 'update:modelValue', payload: User[]): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const users = useUsers()

const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <BaseSelect v-model="model" :items="users" key-prop="id" multiple>
    <template #activator>
      {{
        $t("filter.from")
          + (model.length === 0
            ? ""
            : ` ${
              model.length === 1
                ? useUserName(model[0])
                : `${model.length} ${$t("user.word", model.length)}`}`)
      }}
    </template>
    <template #item="{ item }">
      {{ useUserName(item) }}
    </template>
  </BaseSelect>
</template>
