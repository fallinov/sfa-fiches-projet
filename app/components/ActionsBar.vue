<script setup lang="ts">
import t from '~/i18n/fr'

const toast = useToast()
const { resetForm } = useFormData()
const { saveToStorage, clearStorage } = useFormPersistence()
const { copyShareLink, downloadJson, importJsonFile } = useFormExport()

const fileInput = ref<HTMLInputElement | null>(null)
const showResetModal = ref(false)
const saveStatus = ref('')

function showSaveStatus() {
  saveStatus.value = t.actions.saved
  setTimeout(() => { saveStatus.value = '' }, 2000)
}

async function handleCopyLink() {
  const success = await copyShareLink()
  if (success) {
    toast.add({ title: t.toasts.linkCopied, color: 'success' })
  }
}

function handleDownload() {
  downloadJson()
  toast.add({ title: t.toasts.downloaded, color: 'success' })
}

function handleImportClick() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    await importJsonFile(file)
    saveToStorage()
    toast.add({ title: t.toasts.imported, color: 'success' })
  } catch {
    toast.add({ title: t.toasts.importError, color: 'error' })
  }

  input.value = ''
}

function handleReset() {
  showResetModal.value = true
}

function confirmReset() {
  clearStorage()
  resetForm()
  showResetModal.value = false
  toast.add({ title: t.toasts.reset, color: 'neutral' })
}

defineExpose({ showSaveStatus })
</script>

<template>
  <div class="print-hidden sticky top-0 z-10 flex flex-wrap items-center gap-2 p-3 bg-gray-900 dark:bg-gray-800 rounded-lg mb-6 shadow-lg">
    <UButton
      :label="t.actions.copyLink"
      icon="i-lucide-link"
      color="primary"
      size="sm"
      @click="handleCopyLink"
    />

    <UButton
      :label="t.actions.download"
      icon="i-lucide-download"
      color="neutral"
      variant="subtle"
      size="sm"
      @click="handleDownload"
    />

    <UButton
      :label="t.actions.import"
      icon="i-lucide-upload"
      color="neutral"
      variant="subtle"
      size="sm"
      @click="handleImportClick"
    />

    <input
      ref="fileInput"
      type="file"
      accept=".json"
      class="hidden"
      @change="handleFileChange"
    >

    <span
      v-if="saveStatus"
      class="text-xs text-emerald-400 ml-1 transition-opacity"
    >
      &#10003; {{ saveStatus }}
    </span>

    <div class="flex-1" />

    <UButton
      :label="t.actions.reset"
      icon="i-lucide-trash-2"
      color="neutral"
      variant="ghost"
      size="sm"
      @click="handleReset"
    />

    <UModal v-model:open="showResetModal">
      <template #content>
        <div class="p-6 space-y-4">
          <h3 class="text-lg font-bold">
            {{ t.modals.resetTitle }}
          </h3>
          <p class="text-muted">
            {{ t.modals.resetDescription }}
          </p>
          <div class="flex justify-end gap-3 mt-6">
            <UButton
              :label="t.modals.resetCancel"
              color="neutral"
              variant="outline"
              @click="showResetModal = false"
            />
            <UButton
              :label="t.modals.resetConfirm"
              color="error"
              @click="confirmReset"
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
