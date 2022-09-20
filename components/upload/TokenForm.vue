<template>
  <form @submit.prevent="handleTokenSubmit">
    <div class="form-control">
      <label for="token" class="label">
        <span class="label-text text-lg font-semibold capitalize">
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
        <span class="label-text text-error" v-if="tokenError">
          {{ $t("token.invalid") }}
        </span>
      </label>
    </div>
    <div class="form-control mt-2">
      <button type="submit" class="btn btn-primary" :disabled="!tokenInput">
        {{ $t("workspace.open") }}
      </button>
    </div>
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
