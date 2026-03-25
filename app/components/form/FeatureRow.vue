<script setup lang="ts">
import type { Feature } from '~/composables/useFormData'
import t from '~/i18n/fr'

const feature = defineModel<Feature>({ required: true })

defineProps<{
  index: number
}>()

defineEmits<{
  remove: []
}>()

const priorityItems = [
  { label: t.sections.features.priorities.must, value: 'must' },
  { label: t.sections.features.priorities.should, value: 'should' },
  { label: t.sections.features.priorities.could, value: 'could' },
  { label: t.sections.features.priorities.wont, value: 'wont' }
]

const priorityColors: Record<string, string> = {
  must: 'bg-red-100 border-red-400 dark:bg-red-950 dark:border-red-700',
  should: 'bg-amber-100 border-amber-400 dark:bg-amber-950 dark:border-amber-700',
  could: 'bg-blue-100 border-blue-400 dark:bg-blue-950 dark:border-blue-700',
  wont: 'bg-gray-100 border-gray-400 dark:bg-gray-950 dark:border-gray-600'
}
</script>

<template>
  <tr>
    <td class="text-center font-semibold text-muted text-sm py-2 px-2 w-12">
      {{ index + 1 }}
    </td>
    <td class="py-2 px-2">
      <UInput
        v-model="feature.description"
        :placeholder="t.sections.features.descriptionPlaceholder"
        size="sm"
      />
    </td>
    <td class="py-2 px-2 w-36">
      <USelect
        v-model="feature.priority"
        :items="priorityItems"
        :placeholder="t.sections.features.priorityPlaceholder"
        size="sm"
        :class="feature.priority ? priorityColors[feature.priority] : ''"
        class="rounded"
      />
    </td>
    <td class="py-2 px-2 w-10">
      <UButton
        icon="i-lucide-x"
        color="error"
        variant="ghost"
        size="xs"
        aria-label="Supprimer"
        @click="$emit('remove')"
      />
    </td>
  </tr>
</template>
