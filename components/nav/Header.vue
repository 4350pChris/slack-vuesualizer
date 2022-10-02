<template>
  <div
    class="h-16 w-full fixed top-0 z-40 lg:border-b border-slate-800/10 dark:border-slate-100/25 text-base-content bg-base-100 flex justify-center"
  >
    <nav class="navbar w-full container mx-auto relative gap-2">
      <div class="flex-0 lg:hidden" v-if="!simple">
        <label for="drawer" class="btn btn-ghost btn-circle" tabindex="0">
          <span class="w-6 h-6 i-line-md:menu" />
        </label>
      </div>
      <div class="flex justify-center grow">
        <MessageSearch v-if="!simple" />
      </div>
      <div class="gap-4" :class="{ 'hidden md:flex': !simple }">
        <NavToken />
        <NavLocaleChanger />
        <NavThemeToggle />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  simple?: boolean;
}

defineProps<Props>();
</script>
