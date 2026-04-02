<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addFont, removeFont, addTypeScale, removeTypeScale } = useDesignData()

const loadedFonts = new Set<string>()

function loadGoogleFont(fontName: string) {
  if (!fontName.trim() || loadedFonts.has(fontName)) return
  loadedFonts.add(fontName)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;700&display=swap`
  document.head.appendChild(link)
}

// Watch font names and load them
watch(() => formData.value.fonts.map(f => f.name), (names) => {
  names.forEach((name) => {
    if (name) loadGoogleFont(name)
  })
}, { immediate: true, deep: true })

function headingFontFamily(sizeName: string): string {
  const name = sizeName.toLowerCase()
  const isHeading = name.startsWith('h') || name === 'title'
  const usage = isHeading ? 'headings' : 'body'
  const font = formData.value.fonts.find(f => f.usage === usage)
  return font?.name ? `'${font.name}', sans-serif` : 'inherit'
}

const fontUsageItems = [
  { label: t.design.sections.typography.usageOptions.headings, value: 'headings' },
  { label: t.design.sections.typography.usageOptions.body, value: 'body' },
  { label: t.design.sections.typography.usageOptions.code, value: 'code' },
  { label: t.design.sections.typography.usageOptions.other, value: 'other' }
]

const realtimeColorsUrl = computed(() => {
  const colors = formData.value.colors
    .map(c => c.hex.replace('#', '').toLowerCase())
    .filter(h => /^[0-9a-f]{3,6}$/.test(h))
    .map(h => h.length === 3 ? h.split('').map(c => c + c).join('') : h)

  const heading = formData.value.fonts.find(f => f.usage === 'headings')?.name || ''
  const body = formData.value.fonts.find(f => f.usage === 'body')?.name || ''

  if (!heading && !body) return null

  const defaults = ['333333', 'ffffff', '0f766e', 'e2e8f0', 'f59e0b']
  const mapped = Array.from({ length: 5 }, (_, i) => colors[i] ?? defaults[i])
  const fontParam = `&fonts=${encodeURIComponent(heading || 'Inter')}-${encodeURIComponent(body || 'Inter')}`

  return `https://www.realtimecolors.com/?colors=${mapped.join('-')}${fontParam}`
})
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.typography.title }}
          </h2>
          <DesignTip :content="t.design.sections.typography.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.typography.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(font, index) in formData.fonts"
        :key="font.id"
        class="flex items-start gap-3"
      >
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <UFormField :label="t.design.sections.typography.fontName">
            <UInput
              v-model="font.name"
              :placeholder="t.design.sections.typography.fontNamePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.design.sections.typography.fontUsage">
            <USelect
              v-model="font.usage"
              :items="fontUsageItems"
              :placeholder="t.design.sections.typography.fontUsagePlaceholder"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="t.design.sections.typography.fontUrl">
            <UInput
              v-model="font.sampleUrl"
              :placeholder="t.design.sections.typography.fontUrlPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>

        <UButton
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :aria-label="`Supprimer police ${index + 1}`"
          class="mt-6"
          @click="removeFont(font.id)"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <UButton
          :label="t.design.sections.typography.addFont"
          icon="i-lucide-plus"
          variant="outline"
          color="primary"
          @click="addFont()"
        />

        <UButton
          v-if="realtimeColorsUrl"
          label="Prévisualiser sur Realtime Colors"
          icon="i-lucide-palette"
          variant="outline"
          color="primary"
          :to="realtimeColorsUrl"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      <!-- Type scale -->
      <div class="mt-4">
        <h3 class="text-sm font-semibold mb-2">
          {{ t.design.sections.typography.typeScale }}
        </h3>
        <div class="space-y-2">
          <div
            v-for="(size, index) in formData.typeScale"
            :key="size.id"
            class="flex items-center gap-3"
          >
            <span class="text-sm font-semibold text-muted tabular-nums w-6 text-center shrink-0">
              {{ index + 1 }}
            </span>
            <UInput
              v-model="size.name"
              :placeholder="t.design.sections.typography.typeScaleNamePlaceholder"
              class="w-24"
            />
            <UInput
              v-model="size.value"
              :placeholder="t.design.sections.typography.typeScaleValuePlaceholder"
              class="w-24"
            />
            <!-- Visual preview text with loaded font -->
            <span
              class="flex-1 text-default truncate"
              :style="{
                fontSize: size.value || '16px',
                fontFamily: headingFontFamily(size.name)
              }"
            >
              Aa
            </span>
            <UButton
              icon="i-lucide-trash-2"
              color="neutral"
              variant="ghost"
              size="sm"
              :aria-label="`Supprimer taille ${index + 1}`"
              @click="removeTypeScale(size.id)"
            />
          </div>
        </div>
        <UButton
          :label="t.design.sections.typography.addTypeScale"
          icon="i-lucide-plus"
          variant="outline"
          color="primary"
          class="mt-3"
          @click="addTypeScale()"
        />
      </div>
    </div>
  </UCard>
</template>
