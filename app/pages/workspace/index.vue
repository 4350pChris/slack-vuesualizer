<template>
  <div
    class="py-4 md:py-6 flex flex-col w-full gap-4 md:gap-6 lg:gap-8 items-center"
  >
    <h1 class="text-center capitalize text-4xl font-bold">
      {{ $t("workspace.yours") }}
    </h1>
    <StatsUsers />
    <StatsChannels />
    <StatsMessages />
  </div>
</template>
