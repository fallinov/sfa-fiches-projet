<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useCardSortingData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.results.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.results.description }}
        </p>
      </div>
    </template>

    <UFormField :label="t.cardSorting.sections.results.summaryLabel">
      <UTextarea
        v-model="formData.resultsSummary"
        :rows="6"
        :placeholder="t.cardSorting.sections.results.summaryPlaceholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
