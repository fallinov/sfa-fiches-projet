<script setup lang="ts">
import t from '~/i18n/fr'

defineProps<{
  readOnly?: boolean
}>()

const { formData } = useCardSortingData()

const lightboxIndex = ref(-1)
const lightboxUrl = computed(() => {
  const idx = lightboxIndex.value
  return idx >= 0 ? formData.value.photos[idx] ?? '' : ''
})

function openLightbox(index: number) {
  lightboxIndex.value = index
}

function closeLightbox() {
  lightboxIndex.value = -1
}

function lightboxPrev() {
  if (lightboxIndex.value > 0) lightboxIndex.value--
}

function lightboxNext() {
  if (lightboxIndex.value < formData.value.photos.length - 1) lightboxIndex.value++
}

watch(lightboxIndex, (idx) => {
  if (idx >= 0) {
    nextTick(() => {
      const el = document.querySelector<HTMLElement>('[tabindex="0"].bg-black')
      el?.focus()
    })
  }
})

const zoomed = ref(false)

function toggleZoom() {
  zoomed.value = !zoomed.value
}

// Reset zoom when changing photo
watch(lightboxIndex, () => {
  zoomed.value = false
})

function handleLightboxKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    lightboxPrev()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    lightboxNext()
  } else if (e.key === 'Escape') {
    closeLightbox()
  }
}

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
        @click="openLightbox(index)"
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

    <!-- Lightbox with keyboard navigation -->
    <UModal
      :open="lightboxIndex >= 0"
      class="max-w-4xl"
      @update:open="closeLightbox"
    >
      <template #content>
        <div
          class="relative bg-black min-h-[50vh]"
          :class="zoomed ? 'overflow-auto max-h-[90vh]' : 'flex items-center justify-center cursor-zoom-in'"
          tabindex="0"
          @keydown="handleLightboxKeydown"
          @click="zoomed ? undefined : closeLightbox()"
        >
          <img
            :src="lightboxUrl"
            alt="Photo en grand"
            :class="zoomed ? 'cursor-zoom-out p-2' : 'max-w-full max-h-[85vh] object-contain p-2'"
            @click.stop="toggleZoom"
          >

          <!-- Previous button -->
          <button
            v-if="lightboxIndex > 0 && !zoomed"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            aria-label="Photo précédente"
            @click.stop="lightboxPrev"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-6 h-6"
            />
          </button>

          <!-- Next button -->
          <button
            v-if="lightboxIndex < formData.photos.length - 1 && !zoomed"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            aria-label="Photo suivante"
            @click.stop="lightboxNext"
          >
            <UIcon
              name="i-lucide-chevron-right"
              class="w-6 h-6"
            />
          </button>

          <!-- Counter -->
          <span
            v-if="!zoomed"
            class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums"
          >
            {{ lightboxIndex + 1 }} / {{ formData.photos.length }}
          </span>
        </div>
      </template>
    </UModal>
  </UCard>
</template>
