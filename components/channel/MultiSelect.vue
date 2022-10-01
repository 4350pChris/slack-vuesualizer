<template>
  <BaseMultiSelect v-model="model" keyProp="id" :items="channels">
    <template #activator>
      {{
        $t("filter.in") +
        (model.length === 0
          ? ""
          : " " +
            (model.length === 1
              ? model[0].name
              : `${model.length} ${$t("channel", model.length)}`))
      }}
    </template>
    <template #item="{ item }">{{ item.name }}</template>
  </BaseMultiSelect>
</template>

<script lang="ts" setup>
import type { Channel } from "~~/types/Channel";

interface Props {
  modelValue: Channel[];
}

interface Emits {
  (event: "update:modelValue", payload: Channel[]): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const model = useVModel(props, "modelValue", emit);

const channels = useChannels();
</script>
