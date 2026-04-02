<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addColor, removeColor } = useDesignData()
const toast = useToast()
const showImportModal = ref(false)
const importUrl = ref('')

const matrixKey = computed(() =>
  formData.value.colors.map(c => `${c.id}:${c.hex}:${c.name}`).join('|')
)

const generatedRealtimeUrl = computed(() => {
  const hexColors = formData.value.colors
    .map(c => c.hex.replace('#', '').toLowerCase())
    .filter(h => /^[0-9a-f]{3,6}$/.test(h))
    .map(h => h.length === 3 ? h.split('').map(c => c + c).join('') : h)

  if (hexColors.length < 2) return null

  // Realtime Colors expects: text-bg-primary-secondary-accent
  const defaults = ['333333', 'ffffff', '0f766e', 'e2e8f0', 'f59e0b']
  const mapped = Array.from({ length: 5 }, (_, i) => hexColors[i] ?? defaults[i])

  // Fonts: heading-body
  const fonts = formData.value.fonts || []
  const heading = fonts.find(f => f.usage === 'headings')?.name || ''
  const body = fonts.find(f => f.usage === 'body')?.name || ''
  const fontParam = (heading || body)
    ? `&fonts=${encodeURIComponent(heading || 'Inter')}-${encodeURIComponent(body || 'Inter')}`
    : ''

  return `https://www.realtimecolors.com/?colors=${mapped.join('-')}${fontParam}`
})

function parseRealtimeColorsUrl(url: string) {
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('realtimecolors.com')) return false

    const colorsParam = parsed.searchParams.get('colors')
    if (colorsParam) {
      const hexValues = colorsParam.split('-').filter(h => /^[0-9a-fA-F]{6}$/.test(h))
      const roleNames = ['Texte', 'Fond', 'Principale', 'Secondaire', 'Accent']
      const roleUsages = [
        'Couleur du texte principal',
        'Couleur de fond des pages',
        'Identité de marque, boutons primaires',
        'Accents, éléments secondaires',
        'Mise en avant, CTA, liens'
      ]

      if (hexValues.length > 0) {
        // Update existing colors or create new ones
        const newColors = hexValues.map((hex, i) => {
          const existing = formData.value.colors[i]
          return {
            id: existing?.id || `ds-rt-${i}`,
            hex: `#${hex}`,
            name: existing?.name || roleNames[i] || `Couleur ${i + 1}`,
            usage: existing?.usage || roleUsages[i] || ''
          }
        })
        formData.value = { ...formData.value, colors: newColors }
        triggerRef(formData)
      }
    }

    const fontsParam = parsed.searchParams.get('fonts')
    if (fontsParam) {
      const fontNames = fontsParam.split('-').map(f => decodeURIComponent(f))
      const fonts = [...formData.value.fonts]
      const headingFont = fonts.find(f => f.usage === 'headings')
      const bodyFont = fonts.find(f => f.usage === 'body')
      if (headingFont && fontNames[0]) headingFont.name = fontNames[0]
      if (bodyFont && fontNames[1]) bodyFont.name = fontNames[1]
      formData.value = { ...formData.value, fonts }
      triggerRef(formData)
    }
  } catch {
    return false
  }
  return true
}

function handleImport() {
  if (!importUrl.value.trim()) return
  const success = parseRealtimeColorsUrl(importUrl.value)
  if (success) {
    formData.value = { ...formData.value, realtimeColorsUrl: importUrl.value }
    triggerRef(formData)
    toast.add({ title: 'Couleurs et polices importées depuis Realtime Colors', color: 'success' })
    showImportModal.value = false
    importUrl.value = ''
  } else {
    toast.add({ title: 'URL Realtime Colors invalide', color: 'error' })
  }
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addColor()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.design.sections.colors.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.colors.description }}
        </p>
        <UButton
          label="Importer depuis Realtime Colors"
          icon="i-lucide-download"
          variant="soft"
          color="primary"
          size="sm"
          class="mt-2"
          @click="showImportModal = true"
        />
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(color, index) in formData.colors"
        :key="color.id"
        class="flex items-start gap-3"
      >
        <!-- Color picker + preview -->
        <label class="relative w-10 h-10 rounded-lg border border-default shrink-0 mt-1 cursor-pointer overflow-hidden">
          <div
            class="absolute inset-0"
            :style="{ backgroundColor: color.hex || '#e2e8f0' }"
          />
          <input
            type="color"
            :value="color.hex && /^#[0-9a-fA-F]{6}$/.test(color.hex) ? color.hex : '#cccccc'"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @input="color.hex = ($event.target as HTMLInputElement).value"
          >
        </label>

        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UFormField :label="index === 0 ? t.design.sections.colors.colorName : undefined">
            <UInput
              v-model="color.name"
              :placeholder="t.design.sections.colors.colorNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="index === 0 ? t.design.sections.colors.colorHex : undefined">
            <UInput
              v-model="color.hex"
              :placeholder="t.design.sections.colors.colorHexPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>

        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer couleur ${index + 1}`"
          class="mt-1"
          @click="removeColor(color.id)"
        />
      </div>

      <UButton
        :label="t.design.sections.colors.add"
        icon="i-lucide-plus"
        variant="outline"
        color="primary"
        @click="addColor()"
      />

      <div class="mt-6">
        <DesignContrastMatrix
          :key="matrixKey"
          :colors="formData.colors"
        />
      </div>

      <div class="flex flex-wrap gap-2 mt-6">
        <UButton
          v-if="generatedRealtimeUrl"
          label="Prévisualiser sur Realtime Colors"
          icon="i-lucide-palette"
          variant="outline"
          color="primary"
          :to="generatedRealtimeUrl"
          target="_blank"
          rel="noopener noreferrer"
        />

        <UButton
          v-else
          label="Créer sur Realtime Colors"
          icon="i-lucide-external-link"
          variant="outline"
          color="primary"
          to="https://www.realtimecolors.com"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      <!-- Import modal -->
      <UModal v-model:open="showImportModal">
        <template #content>
          <div class="p-6 space-y-4">
            <h3 class="text-lg font-bold">
              Importer depuis Realtime Colors
            </h3>
            <p class="text-sm text-muted">
              Collez l'URL de votre palette Realtime Colors pour importer automatiquement les couleurs et polices.
            </p>
            <UInput
              v-model="importUrl"
              type="url"
              placeholder="https://www.realtimecolors.com/?colors=..."
              icon="i-lucide-link"
              class="w-full"
              autofocus
              @keydown.enter="handleImport"
            />
            <div class="flex justify-end gap-3">
              <UButton
                label="Annuler"
                color="neutral"
                variant="outline"
                @click="showImportModal = false"
              />
              <UButton
                label="Importer"
                icon="i-lucide-download"
                color="primary"
                @click="handleImport"
              />
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </UCard>
</template>
