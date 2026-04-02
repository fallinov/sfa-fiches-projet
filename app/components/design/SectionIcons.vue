<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useDesignData()

const libraryItems = Object.entries(t.design.sections.icons.libraries).map(([value, label]) => ({
  value,
  label: label as string
}))

const styleItems = Object.entries(t.design.sections.icons.styles).map(([value, label]) => ({
  value,
  label: label as string
}))
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.icons.title }}
          </h2>
          <DesignTip :content="t.design.sections.icons.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.icons.description }}
        </p>
      </div>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField :label="t.design.sections.icons.library">
        <USelect
          v-model="formData.iconLibrary"
          :items="libraryItems"
          :placeholder="t.design.sections.icons.libraryPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.design.sections.icons.style">
        <USelect
          v-model="formData.iconVariant"
          :items="styleItems"
          :placeholder="t.design.sections.icons.stylePlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      :label="t.design.sections.icons.notes"
      class="mt-4"
    >
      <UTextarea
        v-model="formData.iconNotes"
        :rows="2"
        :placeholder="t.design.sections.icons.notesPlaceholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
