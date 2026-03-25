<script setup lang="ts">
import type { Feature } from '~/composables/useCadrageData'
import t from '~/i18n/fr'

const feature = defineModel<Feature>({ required: true })

const props = defineProps<{
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
  wont: 'bg-gray-50 dark:bg-gray-800/50'
}

const priorityBadge: Record<string, string> = {
  must: 'text-red-700 dark:text-red-400',
  should: 'text-amber-700 dark:text-amber-400',
  could: 'text-blue-700 dark:text-blue-400',
  wont: 'text-gray-500 dark:text-gray-400'
}

const priorityIcon: Record<string, string> = {
  must: '!!',
  should: '!',
  could: '~',
  wont: '—'
}

const selectAriaLabel = computed(() => `${t.sections.features.priorityLabel} ${props.index + 1}`)
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
        class="w-full"
      />
    </td>
    <td class="py-2.5 px-2 w-32 sm:w-48">
      <div class="flex items-center gap-1.5">
        <!-- C1: Badge textuel pour daltoniens (pas couleur seule) -->
        <span
          v-if="feature.priority"
          class="font-bold text-xs w-5 text-center shrink-0"
          :class="priorityBadge[feature.priority]"
          aria-hidden="true"
        >
          {{ priorityIcon[feature.priority] }}
        </span>
        <USelect
          v-model="feature.priority"
          :items="priorityItems"
          :placeholder="t.sections.features.priorityPlaceholder"
          :aria-label="selectAriaLabel"
          class="w-full"
        />
      </div>
    </td>
    <td class="py-2.5 px-1 w-10 text-center">
      <UButton
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        size="sm"
        :aria-label="`Supprimer fonctionnalité ${index + 1}`"
        @click="$emit('remove')"
      />
    </td>
  </tr>
</template>
