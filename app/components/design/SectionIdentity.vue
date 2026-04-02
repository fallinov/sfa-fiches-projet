<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useDesignData()

const groups = t.design.sections.identity.groups

function toggleTrait(trait: string) {
  const traits = formData.value.identityTraits
  const index = traits.indexOf(trait)
  if (index >= 0) {
    traits.splice(index, 1)
  } else {
    traits.push(trait)
  }
}

function isSelected(trait: string): boolean {
  return formData.value.identityTraits.includes(trait)
}
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.identity.title }}
          </h2>
          <DesignTip :content="t.design.sections.identity.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.identity.description }}
        </p>
      </div>
    </template>

    <div class="space-y-5">
      <div
        v-for="(group, key) in groups"
        :key="key"
      >
        <h3 class="text-sm font-semibold mb-2">
          {{ group.title }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in group.options"
            :key="option"
            type="button"
            class="px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer"
            :class="isSelected(option)
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-default border-default hover:border-primary hover:text-primary'"
            @click="toggleTrait(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <UFormField
        :label="t.design.sections.identity.notesLabel"
        class="mt-4"
      >
        <UTextarea
          v-model="formData.identityNotes"
          :rows="3"
          :placeholder="t.design.sections.identity.notesPlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
