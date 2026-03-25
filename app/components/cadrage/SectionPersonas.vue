<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addPersona, removePersona } = useCadrageData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addPersona()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.sections.personas.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.sections.personas.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <CadragePersonaBlock
        v-for="(persona, index) in formData.personas"
        :key="persona.id"
        v-model="formData.personas[index]!"
        :index="index"
        :can-remove="formData.personas.length > 1"
        @remove="removePersona(persona.id)"
      />

      <UButton
        :label="t.sections.personas.add"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addPersona()"
      />
    </div>
  </UCard>
</template>
