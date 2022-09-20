<template>
  <div
    class="drawer-side lg:border-r border-slate-800/10 dark:border-slate-100/25 pt-16"
  >
    <label for="drawer" class="drawer-overlay" ref="toggle"></label>
    <aside
      class="bg-base-100 text-base-content w-80 px-2 py-4"
      @click="toggle.click()"
    >
      <div class="md:hidden mb-4 gap-2" @click.stop>
        <div class="flex justify-center">
          <NavToken />
        </div>
        <div class="flex justify-evenly gap-4">
          <NavLocaleChanger />
          <NavThemeToggle />
        </div>
      </div>
      <NavMenu :channels="channels" />
      <NavFooter class="mt-8" />
      <div
        class="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"
      ></div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const toggle = ref<HTMLElement>(null);

const channels = useChannels();
</script>
