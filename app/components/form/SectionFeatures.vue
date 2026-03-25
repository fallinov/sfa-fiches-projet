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

    <div class="overflow-x-auto">
      <table class="w-full border-collapse min-w-[480px]">
        <thead>
          <tr class="bg-gray-900 dark:bg-gray-800 text-white text-sm">
            <th class="py-2.5 px-3 text-center w-12 font-semibold">
              {{ t.sections.features.columnNumber }}
            </th>
            <th class="py-2.5 px-2 text-left font-semibold">
              {{ t.sections.features.columnFeature }}
            </th>
            <th class="py-2.5 px-2 text-left font-semibold w-32 sm:w-36">
              {{ t.sections.features.columnPriority }}
            </th>
            <th class="w-10" />
          </tr>
        </thead>
        <tbody>
          <FormFeatureRow
            v-for="(feature, index) in formData.features"
            :key="feature.id"
            v-model="formData.features[index]"
            :index="index"
            @remove="removeFeature(feature.id)"
          />
        </tbody>
      </table>
    </div>

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
