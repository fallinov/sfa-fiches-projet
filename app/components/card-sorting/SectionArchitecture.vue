<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useCardSortingData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.architecture.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.architecture.description }}
        </p>
      </div>
    </template>

    <UFormField :label="t.cardSorting.sections.architecture.label">
      <UTextarea
        v-model="formData.architecture"
        :rows="12"
        :placeholder="t.cardSorting.sections.architecture.placeholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
