<script setup lang="ts">
import type { Persona } from '~/composables/useFormData'
import t from '~/i18n/fr'

const persona = defineModel<Persona>({ required: true })

defineProps<{
  index: number
  canRemove: boolean
}>()

defineEmits<{
  remove: []
}>()

const levelItems = [
  { label: t.sections.personas.levelOptions.novice, value: 'novice' },
  { label: t.sections.personas.levelOptions.intermediate, value: 'intermediate' },
  { label: t.sections.personas.levelOptions.expert, value: 'expert' }
]
</script>

<template>
  <div class="border border-default rounded-lg p-4 relative">
    <div class="flex justify-between items-center mb-3">
      <span class="font-bold text-sm text-primary">
        {{ t.sections.personas.label }} {{ index + 1 }}
      </span>
      <UButton
        v-if="canRemove"
        icon="i-lucide-x"
        color="error"
        variant="ghost"
        size="xs"
        aria-label="Supprimer"
        @click="$emit('remove')"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <UFormField :label="t.sections.personas.name">
        <UInput
          v-model="persona.name"
          :placeholder="t.sections.personas.namePlaceholder"
        />
      </UFormField>

      <UFormField :label="t.sections.personas.age">
        <UInput
          v-model.number="persona.age"
          type="number"
          :min="1"
          :max="120"
          :placeholder="t.sections.personas.agePlaceholder"
        />
      </UFormField>

      <UFormField :label="t.sections.personas.job">
        <UInput
          v-model="persona.job"
          :placeholder="t.sections.personas.jobPlaceholder"
        />
      </UFormField>

      <UFormField :label="t.sections.personas.level">
        <USelect
          v-model="persona.level"
          :items="levelItems"
          :placeholder="t.sections.personas.levelPlaceholder"
        />
      </UFormField>

      <UFormField
        :label="t.sections.personas.goal"
        class="sm:col-span-2"
      >
        <UTextarea
          v-model="persona.goal"
          :rows="2"
          :placeholder="t.sections.personas.goalPlaceholder"
        />
      </UFormField>

      <UFormField
        :label="t.sections.personas.frustrations"
        class="sm:col-span-2"
      >
        <UTextarea
          v-model="persona.frustrations"
          :rows="2"
          :placeholder="t.sections.personas.frustrationsPlaceholder"
        />
      </UFormField>
    </div>
  </div>
</template>
