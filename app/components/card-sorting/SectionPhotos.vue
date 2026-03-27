<script setup lang="ts">
import t from '~/i18n/fr'

defineProps<{
  readOnly?: boolean
}>()

const { formData } = useCardSortingData()

const lightboxUrl = ref('')

function addPhoto(url: string) {
  formData.value = {
    ...formData.value,
    photos: [...formData.value.photos, url]
  }
  triggerRef(formData)
}

function removePhoto(index: number) {
  const photos = [...formData.value.photos]
  photos.splice(index, 1)
  formData.value = { ...formData.value, photos }
  triggerRef(formData)
}

const tempUpload = ref('')

watch(tempUpload, (url) => {
  if (url) {
    addPhoto(url)
    tempUpload.value = ''
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.photos.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.photos.description }}
        </p>
      </div>
    </template>

    <!-- Photo gallery -->
    <div
      v-if="formData.photos.length > 0"
      class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"
    >
      <div
        v-for="(photo, index) in formData.photos"
        :key="index"
        class="relative group rounded-lg overflow-hidden border border-default cursor-pointer"
        @click="lightboxUrl = photo"
      >
        <img
          :src="photo"
          :alt="`Photo ${index + 1}`"
          class="w-full h-32 object-cover"
          loading="lazy"
        >
        <!-- Delete overlay (edit mode only) -->
        <div
          v-if="!readOnly"
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="solid"
            size="xs"
            :aria-label="`Supprimer photo ${index + 1}`"
            @click.stop="removePhoto(index)"
          />
        </div>
        <!-- Zoom overlay (read-only mode) -->
        <div
          v-else
          class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-zoom-in"
            class="w-6 h-6 text-white"
          />
        </div>
      </div>
    </div>

    <p
      v-else-if="readOnly"
      class="text-sm text-muted"
    >
      {{ t.upload.noImage }}
    </p>

    <!-- Upload (edit mode only) -->
    <ImageUpload
      v-if="!readOnly"
      v-model="tempUpload"
      :label="t.cardSorting.sections.photos.uploadLabel"
    />

    <!-- Lightbox -->
    <UModal
      :open="!!lightboxUrl"
      class="max-w-4xl"
      @update:open="lightboxUrl = ''"
    >
      <template #content>
        <div
          class="p-2 bg-black flex items-center justify-center min-h-[50vh] cursor-pointer"
          @click="lightboxUrl = ''"
        >
          <img
            :src="lightboxUrl"
            alt="Photo en grand"
            class="max-w-full max-h-[85vh] object-contain"
          >
        </div>
      </template>
    </UModal>
  </UCard>
</template>
