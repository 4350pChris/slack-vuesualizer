<template>
  <div
    class="overflow-hidden grid row-auto grid-cols-[3rem_minmax(0,1fr)_auto] lg:grid-cols-[4rem_minmax(0,1fr)_auto] auto-cols-max gap-2 px-2 py-4 relative"
  >
    <div
      class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl skeleton-loader animate-shine"
    />
    <div class="flex flex-col gap-2 w-full overflow-hidden col-start-2">
      <div class="skeleton-loader animate-shine h-5 w-48" />
      <div class="skeleton-loader animate-shine h-16" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.skeleton-loader {
  @apply block bg-repeat-y bg-slate-200/80 dark:bg-slate-700 bg-gradient-to-r from-slate-100/0 via-slate-100/50 to-slate-100/80 dark:from-slate-500/0 dark:via-slate-500/50 dark:to-slate-500/80;
  background-size: 50px 500px;
  background-position: 0 0;
}
</style>
