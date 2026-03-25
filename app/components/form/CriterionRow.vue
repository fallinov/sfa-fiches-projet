<script setup lang="ts">
import type { Criterion } from '~/composables/useFormData'
import t from '~/i18n/fr'

const criterion = defineModel<Criterion>({ required: true })

defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <UCheckbox v-model="criterion.checked" />
    <UInput
      v-model="criterion.text"
      :placeholder="t.sections.criteria.textPlaceholder"
      class="flex-1"
      :class="{ 'line-through opacity-60': criterion.checked }"
    />
    <UButton
      icon="i-lucide-trash-2"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Supprimer le critère"
      @click="$emit('remove')"
    />
  </div>
</template>
