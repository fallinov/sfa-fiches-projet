<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useFormData()
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-bold">
        {{ t.sections.objective.title }}
      </h2>
    </template>

    <div class="space-y-4">
      <UFormField
        :label="t.sections.objective.mainObjective"
        :help="t.sections.objective.mainObjectiveHint"
      >
        <UTextarea
          v-model="formData.objective"
          :placeholder="t.sections.objective.mainObjectivePlaceholder"
          :rows="3"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.sections.objective.projectName">
        <UInput
          v-model="formData.projectName"
          :placeholder="t.sections.objective.projectNamePlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
