<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addGroup, removeGroup } = useCardSortingData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addGroup()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.results.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.results.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(group, index) in formData.groups"
        :key="group.id"
        class="border border-default rounded-lg p-4"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-sm text-primary">
            {{ t.cardSorting.sections.results.groupLabel }} {{ index + 1 }}
          </span>
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="`Supprimer groupe ${index + 1}`"
            @click="removeGroup(group.id)"
          />
        </div>

        <div class="space-y-3">
          <UFormField :label="t.cardSorting.sections.results.groupName">
            <UInput
              v-model="group.groupName"
              :placeholder="t.cardSorting.sections.results.groupNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.cardSorting.sections.results.groupCards">
            <UTextarea
              v-model="group.cardLabels"
              :rows="2"
              :placeholder="t.cardSorting.sections.results.groupCardsPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>
    </div>

    <UButton
      :label="t.cardSorting.sections.results.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addGroup()"
    />
  </UCard>
</template>
