<script setup lang="ts">
import t from '~/i18n/fr'

const { loadFromUrl, loadFromStorage, startAutoSave } = useFormPersistence()

const toast = useToast()

onMounted(() => {
  if (loadFromUrl()) {
    toast.add({ title: t.toasts.loadedFromLink, color: 'success' })
  } else {
    loadFromStorage()
  }
  startAutoSave()
})
</script>

<template>
  <div class="space-y-6">
    <ActionsBar />
    <FormHeader />
    <FormSectionObjective />
    <FormSectionPersonas />
    <FormSectionFeatures />
    <FormSectionConstraints />
    <FormSectionCriteria />
  </div>
</template>
