<template>
  <section>
    <h2 class="text-xl font-bold capitalize">
      {{ $t("token.yours") }}
    </h2>
    <form @submit.prevent="handleTokenSubmit">
      <div class="form-control">
        <label for="token" class="label">
          <span class="label-text text-error" v-if="tokenError">
            {{ $t("token.invalid") }}
          </span>
        </label>
        <input
          type="text"
          id="token"
          name="token"
          class="input input-bordered"
          :class="{ 'input-error': tokenError }"
          v-model="tokenInput"
        />
      </div>
      <div class="form-control mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-outline"
          :disabled="!tokenInput"
        >
          {{ $t("workspace.open") }}
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
const tokenCookie = useCookie("mongouuid");
const tokenInput = ref<string>(tokenCookie.value);
const tokenError = ref(false);

const handleTokenSubmit = async () => {
  tokenError.value = false;
  try {
    await $fetch("/api/check/" + tokenInput.value);
    await navigateTo("/workspace");
  } catch (e) {
    tokenError.value = true;
  }
};

watch(tokenInput, () => (tokenError.value = false));
</script>
