<template>
  <div class="flex flex-col h-screen bg-base-200">
    <nav class="navbar fixed bg-base-100">
      <div class="container mx-auto">
        <NuxtLink class="btn btn-ghost" to="/">Home</NuxtLink>
      </div>
    </nav>
    <main class="mt-16 px-2 py-4 md:px-0 md:py-8 grow container mx-auto">
      <slot />
    </main>
  </div>
</template>
