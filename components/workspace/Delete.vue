<script lang="ts" setup>
const token = useToken()

const deleteWorkspace = async () => {
  await $fetch('/api/workspaces', {
    method: 'DELETE',
    headers: useRequestHeaders(['cookie']),
  })
  token.value = null
  await navigateTo('/')
}

const dialog = ref<HTMLDialogElement>()
</script>

<template>
  <button class="btn btn-sm btn-outline btn-error" @click="unrefElement(dialog)?.showModal()">
    {{ $t('workspace.delete.button') }}
  </button>
  <Teleport to="body">
    <dialog ref="dialog" class="modal modal-bottom sm:modal-middle">
      <LazyWorkspaceConfirmDelete class="modal-box" @confirm="deleteWorkspace" />
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </Teleport>
</template>
