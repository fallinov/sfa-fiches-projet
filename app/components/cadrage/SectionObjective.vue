<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useCadrageData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.sections.objective.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.sections.objective.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <UFormField
        :label="t.sections.objective.mainObjective"
        :help="t.sections.objective.mainObjectiveHint"
        required
      >
        <UTextarea
          v-model="formData.objective"
          :placeholder="t.sections.objective.mainObjectivePlaceholder"
          :rows="3"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t.sections.objective.projectName"
        required
      >
        <UInput
          v-model="formData.projectName"
          :placeholder="t.sections.objective.projectNamePlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
