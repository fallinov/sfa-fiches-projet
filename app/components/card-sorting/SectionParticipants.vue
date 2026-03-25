<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addParticipant, removeParticipant } = useCardSortingData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addParticipant()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.participants.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.participants.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(participant, index) in formData.participants"
        :key="participant.id"
        class="border border-default rounded-lg p-4 relative"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-sm text-primary">
            {{ t.cardSorting.sections.participants.label }} {{ index + 1 }}
          </span>
          <UButton
            v-if="formData.participants.length > 1"
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="`Supprimer participant ${index + 1}`"
            @click="removeParticipant(participant.id)"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UFormField :label="t.cardSorting.sections.participants.name">
            <UInput
              v-model="participant.name"
              :placeholder="t.cardSorting.sections.participants.namePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.cardSorting.sections.participants.profile">
            <UInput
              v-model="participant.profile"
              :placeholder="t.cardSorting.sections.participants.profilePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t.cardSorting.sections.participants.notes"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="participant.notes"
              :rows="2"
              :placeholder="t.cardSorting.sections.participants.notesPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>
    </div>

    <UButton
      :label="t.cardSorting.sections.participants.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addParticipant()"
    />
  </UCard>
</template>
