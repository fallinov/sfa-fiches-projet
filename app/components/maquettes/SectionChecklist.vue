<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useMaquettesData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.maquettes.sections.checklist.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.maquettes.sections.checklist.description }}
        </p>
      </div>
    </template>

    <div class="space-y-1">
      <div
        v-for="item in formData.checklist"
        :key="item.id"
        class="flex items-center gap-3 px-3 py-2 rounded-md transition-colors"
        :class="item.checked ? 'bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'"
      >
        <UCheckbox
          v-model="item.checked"
          :aria-label="item.text"
        />
        <span
          class="text-sm"
          :class="item.checked ? 'line-through text-muted' : ''"
        >
          {{ item.text }}
        </span>
        <UIcon
          v-if="item.checked"
          name="i-lucide-check"
          class="w-4 h-4 text-primary shrink-0 ml-auto"
        />
      </div>
    </div>
  </UCard>
</template>
