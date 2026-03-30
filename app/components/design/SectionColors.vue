<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addColor, removeColor } = useDesignData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addColor()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.design.sections.colors.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.colors.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(color, index) in formData.colors"
        :key="color.id"
        class="flex items-start gap-3"
      >
        <!-- Color preview -->
        <div
          class="w-10 h-10 rounded-lg border border-default shrink-0 mt-1"
          :style="{ backgroundColor: color.hex || '#e2e8f0' }"
        />

        <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <UFormField :label="index === 0 ? t.design.sections.colors.colorName : undefined">
            <UInput
              v-model="color.name"
              :placeholder="t.design.sections.colors.colorNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="index === 0 ? t.design.sections.colors.colorHex : undefined">
            <UInput
              v-model="color.hex"
              :placeholder="t.design.sections.colors.colorHexPlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="index === 0 ? t.design.sections.colors.colorUsage : undefined">
            <UInput
              v-model="color.usage"
              :placeholder="t.design.sections.colors.colorUsagePlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>

        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer couleur ${index + 1}`"
          class="mt-1"
          @click="removeColor(color.id)"
        />
      </div>

      <UButton
        :label="t.design.sections.colors.add"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addColor()"
      />

      <UFormField
        :label="t.design.sections.colors.contrastNotes"
        class="mt-4"
      >
        <UTextarea
          v-model="formData.contrastNotes"
          :rows="2"
          :placeholder="t.design.sections.colors.contrastNotesPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t.design.sections.colors.realtimeColorsUrl"
        :description="t.design.sections.colors.realtimeColorsUrlDescription"
        class="mt-4"
      >
        <UInput
          v-model="formData.realtimeColorsUrl"
          type="url"
          :placeholder="t.design.sections.colors.realtimeColorsUrlPlaceholder"
          icon="i-lucide-palette"
          class="w-full"
        />

        <UButton
          v-if="formData.realtimeColorsUrl"
          :label="t.design.sections.colors.realtimeColorsUrlButton"
          icon="i-lucide-external-link"
          variant="soft"
          color="primary"
          :to="formData.realtimeColorsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2"
        />
      </UFormField>
    </div>
  </UCard>
</template>
