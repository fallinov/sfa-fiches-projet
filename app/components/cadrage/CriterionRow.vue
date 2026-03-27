<script setup lang="ts">
import type { Criterion } from '~/composables/useCadrageData'
import t from '~/i18n/fr'

const criterion = defineModel<Criterion>({ required: true })

defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-3">
      <UCheckbox
        v-model="criterion.checked"
        :aria-label="t.sections.criteria.checkboxLabel"
      />
      <UInput
        v-model="criterion.text"
        :placeholder="t.sections.criteria.textPlaceholder"
        class="flex-1"
        :class="{ 'line-through opacity-70 text-muted': criterion.checked }"
      />
      <UButton
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Supprimer le critère"
        @click="$emit('remove')"
      />
    </div>
    <div class="pl-9">
      <UInput
        v-model="criterion.verification"
        :placeholder="t.sections.criteria.verificationPlaceholder"
        size="sm"
        class="w-full"
      />
    </div>
  </div>
</template>
