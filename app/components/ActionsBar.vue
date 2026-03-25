<script setup lang="ts">
import t from '~/i18n/fr'

const toast = useToast()
const { resetForm } = useFormData()
const { saveToStorage, clearStorage } = useFormPersistence()
const { copyShareLink, downloadJson, importJsonFile } = useFormExport()

const fileInput = ref<HTMLInputElement | null>(null)
const showResetModal = ref(false)

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

function confirmReset() {
  clearStorage()
  resetForm()
  showResetModal.value = false
  toast.add({ title: t.toasts.reset, color: 'neutral' })
}
</script>

<template>
  <nav
    class="print-hidden sticky top-0 z-10 rounded-lg mb-6 shadow-lg bg-gray-900 dark:bg-gray-800"
    aria-label="Actions de la fiche"
  >
    <!-- Main actions row -->
    <div class="flex flex-wrap items-center gap-2 p-3">
      <!-- Primary action: share -->
      <UButton
        :label="t.actions.copyLink"
        icon="i-lucide-share-2"
        color="primary"
        size="sm"
        :title="t.actions.copyLinkTooltip"
        @click="handleCopyLink"
      />

      <!-- Secondary actions: export/import -->
      <div class="flex items-center gap-1 ml-1">
        <UButton
          :label="t.actions.download"
          icon="i-lucide-download"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="handleDownload"
        />

        <UButton
          :label="t.actions.import"
          icon="i-lucide-upload"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="handleImportClick"
        />
      </div>

      <input
        ref="fileInput"
        type="file"
        accept=".json"
        class="hidden"
        @change="handleFileChange"
      >

      <div class="flex-1" />

      <!-- Auto-save indicator -->
      <span class="hidden sm:inline text-xs text-gray-500 mr-2">
        {{ t.actions.autoSaved }}
      </span>

      <!-- Destructive action: reset — visually separated -->
      <UButton
        :label="t.actions.reset"
        icon="i-lucide-trash-2"
        color="error"
        variant="ghost"
        size="sm"
        @click="showResetModal = true"
      />
    </div>

    <UModal v-model:open="showResetModal">
      <template #content>
        <div class="p-6 space-y-4">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center">
              <UIcon
                name="i-lucide-alert-triangle"
                class="text-red-600 dark:text-red-400 w-5 h-5"
              />
            </div>
            <div>
              <h3 class="text-lg font-bold">
                {{ t.modals.resetTitle }}
              </h3>
              <p class="text-muted mt-1">
                {{ t.modals.resetDescription }}
              </p>
            </div>
          </div>
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
  </nav>
</template>
