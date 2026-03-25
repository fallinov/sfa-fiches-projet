<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addFeature, removeFeature } = useFormData()
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <h2 class="text-base font-bold">
        {{ t.sections.features.title }}
      </h2>
    </template>

    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-900 dark:bg-gray-800 text-white text-sm">
          <th class="py-2 px-2 text-center w-12 font-semibold">
            {{ t.sections.features.columnNumber }}
          </th>
          <th class="py-2 px-2 text-left font-semibold">
            {{ t.sections.features.columnFeature }}
          </th>
          <th class="py-2 px-2 text-left font-semibold w-36">
            {{ t.sections.features.columnPriority }}
          </th>
          <th class="w-10" />
        </tr>
      </thead>
      <tbody>
        <FeatureRow
          v-for="(feature, index) in formData.features"
          :key="feature.id"
          v-model="formData.features[index]"
          :index="index"
          :class="index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''"
          @remove="removeFeature(feature.id)"
        />
      </tbody>
    </table>

    <div class="p-4">
      <UButton
        :label="t.sections.features.add"
        variant="outline"
        color="primary"
        @click="addFeature()"
      />
    </div>
  </UCard>
</template>
