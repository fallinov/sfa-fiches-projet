<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addShadow, removeShadow } = useDesignData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.shadows.title }}
          </h2>
          <DesignTip :content="t.design.sections.shadows.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.shadows.description }}
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(shadow, index) in formData.shadows"
        :key="shadow.id"
        class="flex items-center gap-3"
      >
        <span class="text-sm font-semibold text-muted tabular-nums w-6 text-center shrink-0">
          {{ index + 1 }}
        </span>
        <UInput
          v-model="shadow.name"
          :placeholder="t.design.sections.shadows.namePlaceholder"
          class="w-24"
        />
        <UInput
          v-model="shadow.value"
          :placeholder="t.design.sections.shadows.valuePlaceholder"
          class="flex-1"
        />
        <!-- Visual preview -->
        <div
          class="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg shrink-0"
          :style="{ boxShadow: shadow.value || 'none' }"
        />
        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer ombre ${index + 1}`"
          @click="removeShadow(shadow.id)"
        />
      </div>
    </div>

    <UButton
      :label="t.design.sections.shadows.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addShadow()"
    />
  </UCard>
</template>
