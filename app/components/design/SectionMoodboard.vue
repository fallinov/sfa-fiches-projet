<script setup lang="ts">
import t from '~/i18n/fr'

defineProps<{
  readOnly?: boolean
}>()

const { formData } = useDesignData()

const lightboxIndex = ref(-1)
const lightboxUrl = computed(() => {
  const idx = lightboxIndex.value
  return idx >= 0 ? formData.value.moodboard[idx] ?? '' : ''
})

function addImage(url: string) {
  formData.value = {
    ...formData.value,
    moodboard: [...formData.value.moodboard, url]
  }
  triggerRef(formData)
}

function removeImage(index: number) {
  const moodboard = [...formData.value.moodboard]
  moodboard.splice(index, 1)
  formData.value = { ...formData.value, moodboard }
  triggerRef(formData)
}

const tempUpload = ref('')

watch(tempUpload, (url) => {
  if (url) {
    addImage(url)
    tempUpload.value = ''
  }
})

const zoomed = ref(false)

function closeLightbox() {
  lightboxIndex.value = -1
  zoomed.value = false
}

function handleLightboxKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' && lightboxIndex.value > 0) {
    e.preventDefault()
    lightboxIndex.value--
    zoomed.value = false
  } else if (e.key === 'ArrowRight' && lightboxIndex.value < formData.value.moodboard.length - 1) {
    e.preventDefault()
    lightboxIndex.value++
    zoomed.value = false
  } else if (e.key === 'Escape') {
    closeLightbox()
  }
}

watch(lightboxIndex, (idx) => {
  if (idx >= 0) {
    nextTick(() => {
      const el = document.querySelector<HTMLElement>('[tabindex="0"].bg-black')
      el?.focus()
    })
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.moodboard.title }}
          </h2>
          <DesignTip :content="t.design.sections.moodboard.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.moodboard.description }}
        </p>
      </div>
    </template>

    <div
      v-if="formData.moodboard.length > 0"
      class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4"
    >
      <div
        v-for="(img, index) in formData.moodboard"
        :key="index"
        class="relative group rounded-lg overflow-hidden border border-default cursor-pointer"
        @click="lightboxIndex = index"
      >
        <img
          :src="img"
          :alt="`Inspiration ${index + 1}`"
          class="w-full h-32 object-cover"
          loading="lazy"
        >
        <div
          v-if="!readOnly"
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="solid"
            size="xs"
            :aria-label="`Supprimer image ${index + 1}`"
            @click.stop="removeImage(index)"
          />
        </div>
      </div>
    </div>

    <p
      v-else-if="readOnly"
      class="text-sm text-muted"
    >
      Aucune image d'inspiration
    </p>

    <ImageUpload
      v-if="!readOnly"
      v-model="tempUpload"
      :label="t.design.sections.moodboard.uploadLabel"
    />

    <!-- Lightbox -->
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
            alt="Image en grand"
            :class="zoomed ? 'cursor-zoom-out p-2' : 'max-w-full max-h-[85vh] object-contain p-2'"
            @click.stop="zoomed = !zoomed"
          >

          <button
            v-if="lightboxIndex > 0 && !zoomed"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            aria-label="Image précédente"
            @click.stop="lightboxIndex--; zoomed = false"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-6 h-6"
            />
          </button>

          <button
            v-if="lightboxIndex < formData.moodboard.length - 1 && !zoomed"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            aria-label="Image suivante"
            @click.stop="lightboxIndex++; zoomed = false"
          >
            <UIcon
              name="i-lucide-chevron-right"
              class="w-6 h-6"
            />
          </button>

          <span
            v-if="!zoomed"
            class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums"
          >
            {{ lightboxIndex + 1 }} / {{ formData.moodboard.length }}
          </span>
        </div>
      </template>
    </UModal>
  </UCard>
</template>
