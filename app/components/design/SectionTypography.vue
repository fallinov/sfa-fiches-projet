<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addFont, removeFont } = useDesignData()

const fontUsageItems = [
  { label: t.design.sections.typography.usageOptions.headings, value: 'headings' },
  { label: t.design.sections.typography.usageOptions.body, value: 'body' },
  { label: t.design.sections.typography.usageOptions.code, value: 'code' },
  { label: t.design.sections.typography.usageOptions.other, value: 'other' }
]
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.design.sections.typography.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.typography.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(font, index) in formData.fonts"
        :key="font.id"
        class="flex items-start gap-3"
      >
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <UFormField :label="t.design.sections.typography.fontName">
            <UInput
              v-model="font.name"
              :placeholder="t.design.sections.typography.fontNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.design.sections.typography.fontUsage">
            <USelect
              v-model="font.usage"
              :items="fontUsageItems"
              :placeholder="t.design.sections.typography.fontUsagePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.design.sections.typography.fontUrl">
            <UInput
              v-model="font.sampleUrl"
              :placeholder="t.design.sections.typography.fontUrlPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>

        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer police ${index + 1}`"
          class="mt-6"
          @click="removeFont(font.id)"
        />
      </div>

      <UButton
        :label="t.design.sections.typography.addFont"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addFont()"
      />

      <UFormField
        :label="t.design.sections.typography.typeScale"
        class="mt-4"
      >
        <UTextarea
          v-model="formData.typeScale"
          :rows="4"
          :placeholder="t.design.sections.typography.typeScalePlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
