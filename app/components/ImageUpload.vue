<script setup lang="ts">
import t from '~/i18n/fr'

const modelValue = defineModel<string>({ default: '' })

defineProps<{
  label?: string
}>()

const { uploadImage, isUploading, error } = useImageUpload()
const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()

async function handleFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const url = await uploadImage(file)
  if (url) {
    modelValue.value = url
    toast.add({ title: t.upload.success, color: 'success' })
  } else {
    toast.add({ title: error.value || t.upload.error, color: 'error' })
  }

  input.value = ''
}

function removeImage() {
  modelValue.value = ''
}

function triggerUpload() {
  fileInput.value?.click()
}
</script>

<template>
  <div>
    <!-- Preview -->
    <div
      v-if="modelValue"
      class="relative group rounded-lg overflow-hidden border border-default"
    >
      <img
        :src="modelValue"
        :alt="label || t.upload.imageAlt"
        class="w-full h-48 object-cover"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="solid"
          size="sm"
          :aria-label="t.upload.remove"
          @click="removeImage"
        />
        <UButton
          icon="i-lucide-replace"
          color="neutral"
          variant="solid"
          size="sm"
          :aria-label="t.upload.replace"
          @click="triggerUpload"
        />
      </div>
    </div>

    <!-- Upload zone -->
    <div
      v-else
      class="border-2 border-dashed border-default rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
      @click="triggerUpload"
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

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFile"
    >
  </div>
</template>
