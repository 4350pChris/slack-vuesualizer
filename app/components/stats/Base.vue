<template>
  <div class="hero p-4">
    <div class="hero-content text-center">
      <div class="max-w-md text-4xl md:text-5xl lg:text-6xl">
        <p class="font-bold font-mono">
          <slot name="title" />
        </p>
        <p>
          <slot name="content" />
        </p>
      </div>
    </div>
  </div>
</template>
