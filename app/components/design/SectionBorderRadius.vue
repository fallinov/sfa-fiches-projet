<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addBorderRadius, removeBorderRadius } = useDesignData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.borderRadius.title }}
          </h2>
          <DesignTip :content="t.design.sections.borderRadius.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.borderRadius.description }}
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(radius, index) in formData.borderRadii"
        :key="radius.id"
        class="flex items-center gap-3"
      >
        <span class="text-sm font-semibold text-muted tabular-nums w-6 text-center shrink-0">
          {{ index + 1 }}
        </span>
        <UInput
          v-model="radius.name"
          :placeholder="t.design.sections.borderRadius.namePlaceholder"
          class="w-24"
        />
        <UInput
          v-model="radius.value"
          :placeholder="t.design.sections.borderRadius.valuePlaceholder"
          class="w-24"
        />
        <!-- Visual preview -->
        <div
          class="w-12 h-12 bg-primary/20 border-2 border-primary/40 shrink-0"
          :style="{ borderRadius: radius.value || '0px' }"
        />
        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer arrondi ${index + 1}`"
          @click="removeBorderRadius(radius.id)"
        />
      </div>
    </div>

    <UButton
      :label="t.design.sections.borderRadius.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addBorderRadius()"
    />
  </UCard>
</template>
