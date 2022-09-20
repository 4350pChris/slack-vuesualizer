<template>
  <div>
    <NavHeader :simple="true" />
    <main
      class="overflow-x-hidden mt-16 container mx-auto bg-base-100 p-2 md:p-4"
    >
      <slot />
    </main>
  </div>
</template>
