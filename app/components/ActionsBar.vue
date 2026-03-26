<script setup lang="ts">
import t from '~/i18n/fr'

const props = defineProps<{
  copyShareLink: () => Promise<boolean>
  downloadJson: () => void
  importJsonFile: (file: File) => Promise<void>
  saveToStorage: () => void
  clearStorage: () => void
  resetForm: () => void
  validate: () => { field: string, message: string }[]
  sectionProgress: () => { filled: number, total: number }
  readOnly?: boolean
}>()

const toast = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const showResetModal = ref(false)

const progress = computed(() => props.sectionProgress())
const progressLabel = computed(() =>
  t.actions.progress.replace('{filled}', String(progress.value.filled)).replace('{total}', String(progress.value.total))
)

async function handleCopyLink() {
  const errors = props.validate()
  if (errors.length > 0) {
    toast.add({ title: t.validation.fixErrors, color: 'warning' })
    return
  }
  const success = await props.copyShareLink()
  if (success) {
    toast.add({ title: t.toasts.linkCopied, color: 'success' })
  }
}

function handleDownload() {
  props.downloadJson()
  toast.add({ title: t.toasts.downloaded, color: 'success' })
}

function handlePrint() {
  window.print()
}

function handleImportClick() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    await props.importJsonFile(file)
    props.saveToStorage()
    toast.add({ title: t.toasts.imported, color: 'success' })
  } catch {
    toast.add({ title: t.toasts.importError, color: 'error' })
  }

  input.value = ''
}

function confirmReset() {
  props.clearStorage()
  props.resetForm()
  showResetModal.value = false
  toast.add({ title: t.toasts.reset, color: 'neutral' })
}
</script>

<template>
  <nav
    class="print-hidden sticky top-0 z-10 rounded-lg mb-6 shadow-lg bg-gray-900 dark:bg-gray-800"
    aria-label="Actions de la fiche"
  >
    <div class="flex flex-wrap items-center gap-2 p-3">
      <!-- Read-only badge when opened via shared URL -->
      <div
        v-if="readOnly"
        class="flex items-center gap-1.5 text-sm text-amber-400"
      >
        <UIcon
          name="i-lucide-eye"
          class="w-4 h-4"
        />
        <span>{{ t.actions.readOnly }}</span>
      </div>

      <!-- Share button (hidden in read-only: data already comes from URL) -->
      <UButton
        v-if="!readOnly"
        :label="t.actions.copyLink"
        icon="i-lucide-share-2"
        color="primary"
        :title="t.actions.copyLinkTooltip"
        @click="handleCopyLink"
      />

      <div class="flex items-center gap-1 ml-1">
        <UButton
          :label="t.actions.download"
          icon="i-lucide-download"
          color="neutral"
          variant="subtle"
          :title="t.actions.downloadTooltip"
          @click="handleDownload"
        />

        <UButton
          v-if="!readOnly"
          :label="t.actions.import"
          icon="i-lucide-upload"
          color="neutral"
          variant="subtle"
          :title="t.actions.importTooltip"
          @click="handleImportClick"
        />

        <UButton
          :label="t.actions.print"
          icon="i-lucide-printer"
          color="neutral"
          variant="subtle"
          :title="t.actions.printTooltip"
          @click="handlePrint"
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

      <!-- Progress + auto-save (only in edit mode) -->
      <template v-if="!readOnly">
        <div class="hidden sm:flex items-center gap-2 text-sm mr-2">
          <div class="flex gap-0.5">
            <div
              v-for="i in progress.total"
              :key="i"
              class="w-2 h-2 rounded-full transition-colors"
              :class="i <= progress.filled ? 'bg-primary' : 'bg-gray-600'"
            />
          </div>
          <span class="text-gray-400 text-xs">{{ progressLabel }}</span>
        </div>

        <div class="flex items-center gap-1 text-sm text-primary">
          <UIcon
            name="i-lucide-check-circle"
            class="w-4 h-4"
          />
          <span class="hidden sm:inline">{{ t.actions.autoSaved }}</span>
        </div>

        <UButton
          :label="t.actions.reset"
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          @click="showResetModal = true"
        />
      </template>
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
