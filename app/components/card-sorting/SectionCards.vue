<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addCard, removeCard } = useCardSortingData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addCard()
  }
}

function escapeHtml(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function printCards() {
  const cards = formData.value.cards.filter(c => c.label.trim())
  if (cards.length === 0) return

  const projectName = escapeHtml(formData.value.projectName || 'Card Sorting')

  const cardsHtml = cards.map((c) => {
    const label = escapeHtml(c.label)
    const desc = c.description.trim() ? `<div class="card-desc">${escapeHtml(c.description)}</div>` : ''
    return `<div class="card"><div class="card-label">${label}</div>${desc}</div>`
  }).join('\n')

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Cartes à découper — ${projectName}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; padding: 12mm; }
h1 { font-size: 14px; text-align: center; margin-bottom: 8mm; color: #555; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}
.card {
  border: 1px dashed #aaa;
  padding: 6mm;
  min-height: 35mm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  page-break-inside: avoid;
}
.card-label {
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
}
.card-desc {
  font-size: 11px;
  color: #6B7280;
  margin-top: 2mm;
}
.cut-info {
  text-align: center;
  font-size: 10px;
  color: #aaa;
  margin-top: 6mm;
  border-top: 1px dashed #ccc;
  padding-top: 3mm;
}
@media print {
  body { padding: 8mm; }
  .cut-info { position: fixed; bottom: 5mm; left: 0; right: 0; }
}
</style>
</head>
<body>
<h1>✂ Cartes à découper — ${projectName}</h1>
<div class="grid">
${cardsHtml}
</div>
<div class="cut-info">Découpez le long des pointillés — ${cards.length} carte${cards.length > 1 ? 's' : ''}</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url, '_blank')
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
      URL.revokeObjectURL(url)
    }
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

    <div class="flex items-center gap-2 mt-4">
      <UButton
        :label="t.cardSorting.sections.cards.add"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addCard()"
      />
      <UButton
        :label="t.cardSorting.sections.cards.printCards"
        icon="i-lucide-printer"
        color="primary"
        @click="printCards"
      />
    </div>
  </UCard>
</template>
