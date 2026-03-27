<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, importData, resetForm } = useCardSortingData()

const sortingTypeItems = [
  { label: t.cardSorting.sections.sortingType.options.open, value: 'open' },
  { label: t.cardSorting.sections.sortingType.options.closed, value: 'closed' },
  { label: t.cardSorting.sections.sortingType.options.hybrid, value: 'hybrid' }
]
const { validate, sectionProgress } = useCardSortingValidation()

const persistence = useFormPersistence({
  storageKey: 'card-sorting-data',
  formData,
  importData: importData as (data: unknown) => void
})

const { downloadJson, copyShareLink, importJsonFile } = useFormExport({
  formData,
  importData: importData as (data: unknown) => void
})

const toast = useToast()

function handleDownload() {
  const data = formData.value
  const name = `${data.studentLastName}-${data.studentFirstName}`.trim().replace(/\s+/g, '-').toLowerCase() || 'fiche'
  downloadJson(`card-sorting-${name}.json`)
}

onMounted(() => {
  if (persistence.loadFromUrl()) {
    toast.add({ title: t.toasts.loadedFromLink, color: 'success' })
  } else {
    persistence.loadFromStorage()
  }
  persistence.startAutoSave()
})
</script>

<template>
  <div class="space-y-6">
    <ActionsBar
      :copy-share-link="copyShareLink"
      :download-json="handleDownload"
      :import-json-file="importJsonFile"
      :save-to-storage="persistence.saveToStorage"
      :clear-storage="persistence.clearStorage"
      :reset-form="resetForm"
      :validate="validate"
      :section-progress="sectionProgress"
      :read-only="persistence.isSharedView.value"
    />
    <CardSortingHeader />

    <UCard>
      <template #header>
        <div>
          <h2 class="text-lg font-bold">
            {{ t.cardSorting.sections.sortingType.title }}
          </h2>
        </div>
      </template>

      <UFormField :label="t.cardSorting.sections.sortingType.title">
        <USelect
          v-model="formData.sortingType"
          :items="sortingTypeItems"
          :placeholder="t.cardSorting.sections.sortingType.placeholder"
          class="w-full sm:w-1/2"
        />
      </UFormField>
    </UCard>

    <CardSortingSectionCards />
    <CardSortingSectionParticipants />
    <CardSortingSectionResults />
    <CardSortingSectionPhotos :read-only="persistence.isSharedView.value" />
    <CardSortingSectionArchitecture />
    <CardSortingSectionChecklist />
  </div>
</template>
