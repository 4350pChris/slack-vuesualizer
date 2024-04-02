<script lang="ts" setup>
const token = useToken()
const link = useShareLink()

const { copied, copy } = useClipboard({ copiedDuring: 3000, source: link })
</script>

<template>
  <button v-if="token" class="btn  transition" :class="copied ? 'btn-success btn-outline' : 'btn-ghost'" @click="copy()">
    <Transition name="fade" mode="out-in">
      <span v-if="copied">
        {{ $t("token.copied") }}
      </span>
      <span v-else>
        {{ $t("token.copy") }}
      </span>
    </Transition>
  </button>
</template>
