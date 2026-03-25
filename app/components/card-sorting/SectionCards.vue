<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addCard, removeCard } = useCardSortingData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addCard()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.cards.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.cards.description }}
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(card, index) in formData.cards"
        :key="card.id"
        class="flex items-start gap-3"
      >
        <span class="text-sm font-semibold text-muted tabular-nums mt-2 w-6 text-center shrink-0">
          {{ index + 1 }}
        </span>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UInput
            v-model="card.label"
            :placeholder="t.cardSorting.sections.cards.labelPlaceholder"
            class="w-full"
          />
          <UInput
            v-model="card.description"
            :placeholder="t.cardSorting.sections.cards.descriptionPlaceholder"
            class="w-full"
          />
        </div>
        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer carte ${index + 1}`"
          class="mt-1"
          @click="removeCard(card.id)"
        />
      </div>
    </div>

    <UButton
      :label="t.cardSorting.sections.cards.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addCard()"
    />
  </UCard>
</template>
