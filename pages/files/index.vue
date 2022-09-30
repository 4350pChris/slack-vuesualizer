<template>
  <div class="flex flex-col gap-4 mb-2">
    <div class="sticky top-0 bg-base-100 py-2">
      <div class="text-lg font-bold mb-2">
        <p>{{ $t("totalFiles", [files.length], files.length) }}</p>
        <p>
          {{
            $t(
              "hiddenFiles",
              [files.length - notHidden.length],
              files.length - notHidden.length
            )
          }}
        </p>
      </div>
      <FilesFilter />
    </div>
    <ul class="list-none space-y-4">
      <li v-for="file in notHidden" :key="file.id">
        <FilesDetail :file="file" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ShownFile } from "~~/types/File";

const { data: files } = await useFetch("/api/files", {
  headers: useRequestHeaders(["cookie"]),
});

const notHidden = files.value.filter((f) => "name" in f) as ShownFile[];
</script>
