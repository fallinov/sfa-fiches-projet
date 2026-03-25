<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addPersona, removePersona } = useFormData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-base font-bold">
          {{ t.sections.personas.title }}
        </h2>
        <p class="text-sm text-muted mt-0.5">
          {{ t.sections.personas.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <FormPersonaBlock
        v-for="(persona, index) in formData.personas"
        :key="persona.id"
        v-model="formData.personas[index]"
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
