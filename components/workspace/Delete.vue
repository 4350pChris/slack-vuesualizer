<script lang="ts" setup>
let token = $(useToken())

const deleteWorkspace = async () => {
  await $fetch('/api/workspaces', {
    method: 'DELETE',
    headers: useRequestHeaders(['cookie']),
  })
  token = null
  await navigateTo('/')
}
</script>

<template>
  <label class="btn btn-sm btn-outline btn-error modal-button" for="delete-workspace-modal">
    {{ $t('workspace.delete.button') }}
  </label>
  <Teleport to="body">
    <input id="delete-workspace-modal" type="checkbox" class="modal-toggle">
    <label for="delete-workspace-modal" class="modal modal-bottom cursor-pointer">
      <label for="" class="modal-box min-h-[24rem] relative">
        <LazyWorkspaceConfirmDelete
          @confirm="deleteWorkspace"
        />
      </label>
    </label>
  </Teleport>
</template>
