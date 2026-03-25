<script setup lang="ts">
import t from '~/i18n/fr'

const { stats } = useChecklistData()

const s = computed(() => stats())

const essentialPercent = computed(() => s.value.essential > 0 ? Math.round((s.value.essentialChecked / s.value.essential) * 100) : 0)
const importantPercent = computed(() => s.value.important > 0 ? Math.round((s.value.importantChecked / s.value.important) * 100) : 0)

const essentialOk = computed(() => essentialPercent.value === 100)
const importantOk = computed(() => importantPercent.value >= 70)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-bold">
        {{ t.checklist.stats.title }}
      </h2>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Essential -->
      <div
        class="text-center p-4 rounded-lg"
        :class="essentialOk ? 'bg-primary/10' : 'bg-red-50 dark:bg-red-950/30'"
      >
        <p
          class="text-3xl font-bold"
          :class="essentialOk ? 'text-primary' : 'text-red-600'"
        >
          {{ s.essentialChecked }}/{{ s.essential }}
        </p>
        <p class="text-sm font-semibold mt-1">
          {{ t.checklist.stats.essential }}
        </p>
        <p class="text-xs text-muted mt-0.5">
          {{ essentialPercent }}% (100% {{ t.checklist.stats.required }})
        </p>
      </div>

      <!-- Important -->
      <div
        class="text-center p-4 rounded-lg"
        :class="importantOk ? 'bg-primary/10' : 'bg-amber-50 dark:bg-amber-950/30'"
      >
        <p
          class="text-3xl font-bold"
          :class="importantOk ? 'text-primary' : 'text-amber-600'"
        >
          {{ s.importantChecked }}/{{ s.important }}
        </p>
        <p class="text-sm font-semibold mt-1">
          {{ t.checklist.stats.important }}
        </p>
        <p class="text-xs text-muted mt-0.5">
          {{ importantPercent }}% (70% {{ t.checklist.stats.required }})
        </p>
      </div>

      <!-- Recommended -->
      <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900/30">
        <p class="text-3xl font-bold text-default">
          {{ s.recommendedChecked }}/{{ s.recommended }}
        </p>
        <p class="text-sm font-semibold mt-1">
          {{ t.checklist.stats.recommended }}
        </p>
        <p class="text-xs text-muted mt-0.5">
          {{ t.checklist.stats.optional }}
        </p>
      </div>
    </div>
  </UCard>
</template>
