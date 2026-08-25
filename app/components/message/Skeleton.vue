<template>
  <div
    class="overflow-hidden grid row-auto grid-cols-[3rem,minmax(0,1fr),auto] lg:grid-cols-[4rem,minmax(0,1fr),auto] auto-cols-max gap-2 px-2 py-4 relative"
  >
    <div class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl skeleton-loader" />
    <div class="flex flex-col gap-2 flex-1 overflow-hidden col-start-2">
      <div class="skeleton-loader h-5 w-48" />
      <div class="skeleton-loader h-16" />
    </div>
  </div>
</template>
