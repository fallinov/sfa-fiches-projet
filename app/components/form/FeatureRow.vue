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
  must: 'bg-red-50 dark:bg-red-950/50',
  should: 'bg-amber-50 dark:bg-amber-950/50',
  could: 'bg-blue-50 dark:bg-blue-950/50',
  wont: 'bg-gray-50 dark:bg-gray-900/50'
}
</script>

<template>
  <tr :class="feature.priority ? priorityColors[feature.priority] : (index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : '')">
    <td class="text-center font-semibold text-muted text-sm py-2.5 px-3 w-12 tabular-nums">
      {{ index + 1 }}
    </td>
    <td class="py-2.5 px-2">
      <UInput
        v-model="feature.description"
        :placeholder="t.sections.features.descriptionPlaceholder"
        size="sm"
        class="w-full"
      />
    </td>
    <td class="py-2.5 px-2 w-32 sm:w-36">
      <USelect
        v-model="feature.priority"
        :items="priorityItems"
        :placeholder="t.sections.features.priorityPlaceholder"
        size="sm"
        class="w-full"
      />
    </td>
    <td class="py-2.5 px-1 w-10 text-center">
      <UButton
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        size="xs"
        :aria-label="`Supprimer fonctionnalité ${index + 1}`"
        @click="$emit('remove')"
      />
    </td>
  </tr>
</template>
