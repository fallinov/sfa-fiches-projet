<script setup lang="ts">
import t from '~/i18n/fr'

const modelValue = defineModel<string>({ default: '' })

defineProps<{
  label?: string
  readOnly?: boolean
}>()

const { uploadImage, isUploading, error } = useImageUpload()
const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()
const lightboxOpen = ref(false)

const isDragOver = ref(false)

async function processFile(file: File) {
  const url = await uploadImage(file)
  if (url) {
    modelValue.value = url
    toast.add({ title: t.upload.success, color: 'success' })
  } else {
    toast.add({ title: error.value || t.upload.error, color: 'error' })
  }
}

async function handleFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  await processFile(file)
  input.value = ''
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = true
}

function onDragLeave() {
  isDragOver.value = false
}

async function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    await processFile(file)
  }
}

function removeImage() {
  modelValue.value = ''
}

function triggerUpload() {
  fileInput.value?.click()
}

function openLightbox() {
  if (modelValue.value) {
    lightboxOpen.value = true
  }
}
</script>

<template>
  <div>
    <!-- Preview with image -->
    <div
      v-if="modelValue"
      class="relative group rounded-lg overflow-hidden border border-default cursor-pointer"
      @click="openLightbox"
    >
      <img
        :src="modelValue"
        :alt="label || t.upload.imageAlt"
        class="w-full h-48 object-cover"
        loading="lazy"
      >
      <!-- Edit overlay (only in edit mode) -->
      <div
        v-if="!readOnly"
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
      >
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="solid"
          size="sm"
          :aria-label="t.upload.remove"
          @click.stop="removeImage"
        />
        <UButton
          icon="i-lucide-replace"
          color="neutral"
          variant="solid"
          size="sm"
          :aria-label="t.upload.replace"
          @click.stop="triggerUpload"
        />
      </div>
      <!-- Zoom icon (read-only mode) -->
      <div
        v-else
        class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <UIcon
          name="i-lucide-zoom-in"
          class="w-8 h-8 text-white"
        />
      </div>
    </div>

    <!-- Upload zone (only in edit mode) -->
    <div
      v-else-if="!readOnly"
      class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
      :class="isDragOver ? 'border-primary bg-primary/10' : 'border-default hover:border-primary hover:bg-primary/5'"
      @click="triggerUpload"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <UIcon
        v-if="!isUploading"
        name="i-lucide-image-plus"
        class="w-8 h-8 text-muted mx-auto"
      />
      <UIcon
        v-else
        name="i-lucide-loader-2"
        class="w-8 h-8 text-primary mx-auto animate-spin"
      />
      <p class="text-sm text-muted mt-2">
        {{ isUploading ? t.upload.uploading : t.upload.dropzone }}
      </p>
    </div>

    <!-- No image in read-only mode -->
    <div
      v-else
      class="border border-default rounded-lg p-4 text-center text-muted text-sm"
    >
      {{ t.upload.noImage }}
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFile"
    >

    <!-- Lightbox modal -->
    <UModal
      v-model:open="lightboxOpen"
      class="max-w-4xl"
    >
      <template #content>
        <div
          class="p-2 bg-black flex items-center justify-center min-h-[50vh] cursor-pointer"
          @click="lightboxOpen = false"
        >
          <img
            :src="modelValue"
            :alt="label || t.upload.imageAlt"
            class="max-w-full max-h-[85vh] object-contain"
          >
        </div>
      </template>
    </UModal>
  </div>
</template>
