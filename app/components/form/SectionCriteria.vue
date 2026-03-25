<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addCriterion, removeCriterion } = useFormData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addCriterion()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.sections.criteria.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.sections.criteria.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div class="space-y-3">
        <FormCriterionRow
          v-for="(criterion, index) in formData.criteria"
          :key="criterion.id"
          v-model="formData.criteria[index]!"
          @remove="removeCriterion(criterion.id)"
        />
      </div>

      <UButton
        :label="t.sections.criteria.add"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addCriterion()"
      />
    </div>
  </UCard>
</template>
