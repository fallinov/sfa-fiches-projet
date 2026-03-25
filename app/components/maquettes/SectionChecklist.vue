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

    <div class="space-y-3">
      <div
        v-for="item in formData.checklist"
        :key="item.id"
        class="flex items-center gap-3"
      >
        <UCheckbox
          v-model="item.checked"
          :aria-label="item.text"
        />
        <span
          class="text-sm"
          :class="{ 'line-through opacity-70 text-muted': item.checked }"
        >
          {{ item.text }}
        </span>
      </div>
    </div>
  </UCard>
</template>
