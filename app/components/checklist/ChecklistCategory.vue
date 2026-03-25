<script setup lang="ts">
import type { ChecklistCategory } from '~/composables/useChecklistData'
import t from '~/i18n/fr'

defineProps<{
  category: ChecklistCategory
}>()

const priorityBadge: Record<string, { label: string, class: string }> = {
  essential: { label: t.checklist.priorities.essential, class: 'text-red-600 dark:text-red-400' },
  important: { label: t.checklist.priorities.important, class: 'text-amber-600 dark:text-amber-400' },
  recommended: { label: t.checklist.priorities.recommended, class: 'text-blue-600 dark:text-blue-400' }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-bold">
        {{ category.title }}
      </h2>
    </template>

    <div class="space-y-1">
      <div
        v-for="item in category.items"
        :key="item.id"
        class="flex items-start gap-3 px-3 py-2 rounded-md transition-colors"
        :class="item.checked ? 'bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'"
      >
        <UCheckbox
          v-model="item.checked"
          :aria-label="item.text"
          class="mt-0.5"
        />
        <div class="flex-1 min-w-0">
          <span
            class="text-sm"
            :class="item.checked ? 'line-through text-muted' : ''"
          >
            {{ item.text }}
          </span>
        </div>
        <span
          v-if="!item.checked"
          class="text-xs font-bold shrink-0"
          :class="priorityBadge[item.priority]?.class"
        >
          {{ priorityBadge[item.priority]?.label }}
        </span>
        <UIcon
          v-else
          name="i-lucide-check"
          class="w-4 h-4 text-primary shrink-0 mt-0.5"
        />
      </div>
    </div>
  </UCard>
</template>
