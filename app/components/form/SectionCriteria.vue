<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addCriterion, removeCriterion } = useFormData()
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-bold">
        {{ t.sections.criteria.title }}
      </h2>
    </template>

    <div class="space-y-4">
      <div>
        <p class="font-semibold text-sm text-default">
          {{ t.sections.criteria.description }}
        </p>
        <p class="text-sm text-muted mt-1">
          {{ t.sections.criteria.hint }}
        </p>
      </div>

      <div class="space-y-3">
        <CriterionRow
          v-for="(criterion, index) in formData.criteria"
          :key="criterion.id"
          v-model="formData.criteria[index]"
          @remove="removeCriterion(criterion.id)"
        />
      </div>

      <UButton
        :label="t.sections.criteria.add"
        variant="outline"
        color="primary"
        @click="addCriterion()"
      />
    </div>
  </UCard>
</template>
