<template>
  <form class="form-control" @submit.prevent="handleTokenSubmit">
    <label for="token" class="label">
      <span class="label-text uppercase">
        {{ $t("token.yours") }}
      </span>
    </label>
    <input
      type="text"
      id="token"
      name="token"
      class="input input-bordered"
      v-model="tokenInput"
    />
    <label class="label">
      <span class="label-text text-error" v-if="tokenError">{{
        $t("token.invalid")
      }}</span>
    </label>
    <button type="submit" class="btn btn-primary" :disabled="!tokenInput">
      {{ $t("workspace.open") }}
    </button>
  </form>
</template>

<script lang="ts" setup>
const tokenInput = ref<string>();
const tokenError = ref(false);

const handleTokenSubmit = async () => {
  tokenError.value = false;
  try {
    await $fetch("/api/check/" + tokenInput.value);
    await navigateTo("/");
  } catch (e) {
    tokenError.value = true;
  }
};
</script>
