<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addSpacing, removeSpacing } = useDesignData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.design.sections.spacings.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.spacings.description }}
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(spacing, index) in formData.spacings"
        :key="spacing.id"
        class="flex items-center gap-3"
      >
        <span class="text-sm font-semibold text-muted tabular-nums w-6 text-center shrink-0">
          {{ index + 1 }}
        </span>
        <UInput
          v-model="spacing.name"
          :placeholder="t.design.sections.spacings.namePlaceholder"
          class="w-24"
        />
        <UInput
          v-model="spacing.value"
          :placeholder="t.design.sections.spacings.valuePlaceholder"
          class="w-24"
        />
        <!-- Visual preview bar -->
        <div
          class="flex-1 h-4 bg-primary/20 rounded"
          :style="{ maxWidth: spacing.value || '0px' }"
        />
        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer espacement ${index + 1}`"
          @click="removeSpacing(spacing.id)"
        />
      </div>
    </div>

    <UButton
      :label="t.design.sections.spacings.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addSpacing()"
    />
  </UCard>
</template>
