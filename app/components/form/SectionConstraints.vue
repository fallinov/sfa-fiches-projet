<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useFormData()

const accessibilityItems = [
  { label: t.sections.constraints.accessibilityOptions.a, value: 'a' },
  { label: t.sections.constraints.accessibilityOptions.aa, value: 'aa' },
  { label: t.sections.constraints.accessibilityOptions.aaa, value: 'aaa' }
]
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-bold">
        {{ t.sections.constraints.title }}
      </h2>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField :label="t.sections.constraints.deadline">
        <UInput
          v-model="formData.constraints.deadline"
          type="date"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.sections.constraints.hours">
        <UInput
          v-model.number="formData.constraints.hours"
          type="number"
          :min="0"
          :placeholder="t.sections.constraints.hoursPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.sections.constraints.tech">
        <UInput
          v-model="formData.constraints.tech"
          :placeholder="t.sections.constraints.techPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.sections.constraints.accessibility">
        <USelect
          v-model="formData.constraints.accessibility"
          :items="accessibilityItems"
          :placeholder="t.sections.constraints.accessibilityPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t.sections.constraints.legal"
        class="sm:col-span-2"
      >
        <UTextarea
          v-model="formData.constraints.legal"
          :rows="2"
          :placeholder="t.sections.constraints.legalPlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
