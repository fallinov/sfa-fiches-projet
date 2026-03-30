<script setup lang="ts">
import t from '~/i18n/fr'

defineProps<{
  readOnly?: boolean
}>()

const { formData, addPage, removePage } = useMaquettesData()

const typeItems = [
  { label: t.maquettes.sections.pages.types.sketch, value: 'sketch' },
  { label: t.maquettes.sections.pages.types.wireframe, value: 'wireframe' },
  { label: t.maquettes.sections.pages.types.mockup, value: 'mockup' }
]

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addPage()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.maquettes.sections.pages.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.maquettes.sections.pages.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(page, index) in formData.pages"
        :key="page.id"
        class="border border-default rounded-lg p-4"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-sm text-primary">
            {{ t.maquettes.sections.pages.pageLabel }} {{ index + 1 }}
          </span>
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="`Supprimer page ${index + 1}`"
            @click="removePage(page.id)"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <UFormField :label="t.maquettes.sections.pages.pageName">
            <UInput
              v-model="page.name"
              :placeholder="t.maquettes.sections.pages.pageNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.maquettes.sections.pages.pageType">
            <USelect
              v-model="page.type"
              :items="typeItems"
              :placeholder="t.maquettes.sections.pages.pageTypePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.maquettes.sections.pages.pageTool">
            <UInput
              v-model="page.tool"
              :placeholder="t.maquettes.sections.pages.pageToolPlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t.maquettes.sections.pages.mockupUrl"
            :hint="t.maquettes.sections.pages.mockupUrlHint"
            class="sm:col-span-3"
          >
            <UInput
              v-model="page.mockupUrl"
              type="url"
              :placeholder="t.maquettes.sections.pages.mockupUrlPlaceholder"
              icon="i-lucide-link"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t.maquettes.sections.pages.pageNotes"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="page.notes"
              :rows="2"
              :placeholder="t.maquettes.sections.pages.pageNotesPlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t.maquettes.sections.pages.screenshot"
            class="sm:col-span-1"
          >
            <ImageUpload
              v-model="page.screenshotUrl"
              :read-only="readOnly"
            />
          </UFormField>
        </div>
      </div>
    </div>

    <UButton
      :label="t.maquettes.sections.pages.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addPage()"
    />

    <UFormField
      :label="t.maquettes.sections.pages.gridSystem"
      class="mt-6"
    >
      <UTextarea
        v-model="formData.gridSystem"
        :rows="2"
        :placeholder="t.maquettes.sections.pages.gridSystemPlaceholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
