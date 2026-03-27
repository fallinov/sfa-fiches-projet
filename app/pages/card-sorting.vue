<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, importData, resetForm } = useCardSortingData()
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
  useStudentIdentity().applyTo(formData as Ref<{ studentLastName: string, studentFirstName: string, projectName: string }>)
  useStudentIdentity().watchAndSave(formData as Ref<{ studentLastName: string, studentFirstName: string, projectName: string }>)
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
    <CardSortingSectionCards />
    <CardSortingSectionParticipants />
    <CardSortingSectionResults />
    <CardSortingSectionPhotos :read-only="persistence.isSharedView.value" />
    <CardSortingSectionArchitecture />
    <CardSortingSectionChecklist />
    <FormNavigation />
  </div>
</template>
