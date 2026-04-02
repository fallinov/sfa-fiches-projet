<script setup lang="ts">
import type { ColorEntry } from '~/composables/useDesignData'

const props = defineProps<{
  colors: ColorEntry[]
}>()

// Resolve any CSS color (hex, named, rgb…) to [r, g, b] using a canvas
const colorCache = new Map<string, [number, number, number] | null>()
let resolverCtx: CanvasRenderingContext2D | null = null

function resolveColor(input: string): [number, number, number] | null {
  const key = input.trim().toLowerCase()
  if (!key) return null
  if (colorCache.has(key)) return colorCache.get(key)!

  // Try hex first (no canvas needed)
  const hex = key.replace('#', '')
  if (/^[0-9a-f]{3}$|^[0-9a-f]{6}$/.test(hex)) {
    const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex
    const num = parseInt(full, 16)
    const result: [number, number, number] = [(num >> 16) & 255, (num >> 8) & 255, num & 255]
    colorCache.set(key, result)
    return result
  }

  // Use canvas to resolve named colors (red, tomato, etc.)
  if (typeof document === 'undefined') return null
  if (!resolverCtx) {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    resolverCtx = canvas.getContext('2d', { willReadFrequently: true })
  }
  if (!resolverCtx) return null

  resolverCtx.clearRect(0, 0, 1, 1)
  resolverCtx.fillStyle = '#000000'
  resolverCtx.fillStyle = input.trim()
  // If fillStyle didn't change from black, the color is invalid (unless it IS black)
  if (resolverCtx.fillStyle === '#000000' && key !== 'black' && key !== '#000' && key !== '#000000') {
    colorCache.set(key, null)
    return null
  }
  resolverCtx.fillRect(0, 0, 1, 1)
  const [r, g, b] = resolverCtx.getImageData(0, 0, 1, 1).data
  const result: [number, number, number] = [r!, g!, b!]
  colorCache.set(key, result)
  return result
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!
}

function contrastRatio(color1: string, color2: string): number | null {
  const rgb1 = resolveColor(color1)
  const rgb2 = resolveColor(color2)
  if (!rgb1 || !rgb2) return null
  const l1 = relativeLuminance(...rgb1)
  const l2 = relativeLuminance(...rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function ratingLabel(ratio: number): string {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA+'
  return 'Fail'
}

function ratingColor(ratio: number): string {
  if (ratio >= 7) return 'text-green-400'
  if (ratio >= 4.5) return 'text-green-500'
  if (ratio >= 3) return 'text-yellow-500'
  return 'text-red-500'
}

const validColors = computed(() =>
  props.colors.filter(c => resolveColor(c.hex) !== null)
)
</script>

<template>
  <div v-if="validColors.length >= 2">
    <h3 class="text-sm font-semibold mb-2">
      Matrice de contraste
    </h3>
    <div class="overflow-x-auto">
      <table class="text-sm border-collapse w-full">
        <thead>
          <tr>
            <th class="p-1.5" />
            <th
              v-for="col in validColors"
              :key="col.id"
              class="p-1.5 text-center font-medium min-w-[70px]"
            >
              <div
                class="w-6 h-6 rounded mx-auto mb-1 border border-default"
                :style="{ backgroundColor: col.hex }"
              />
              <span class="text-muted">{{ col.name || col.hex }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in validColors"
            :key="row.id"
          >
            <td class="p-1.5 font-medium text-right pr-2 whitespace-nowrap">
              <div class="flex items-center gap-1.5 justify-end">
                <span class="text-muted">{{ row.name || row.hex }}</span>
                <div
                  class="w-5 h-5 rounded border border-default shrink-0"
                  :style="{ backgroundColor: row.hex }"
                />
              </div>
            </td>
            <td
              v-for="col in validColors"
              :key="col.id"
              class="p-1 text-center"
            >
              <template v-if="row.id !== col.id">
                <div
                  class="rounded px-3 py-2 flex flex-col items-center gap-1 border border-default/30"
                  :style="{ backgroundColor: col.hex, color: row.hex }"
                >
                  <span class="font-bold text-base leading-tight">Ab</span>
                  <span class="tabular-nums text-xs leading-tight opacity-80">
                    {{ contrastRatio(row.hex, col.hex)?.toFixed(1) }}:1
                  </span>
                </div>
                <span
                  class="text-xs font-bold block mt-1"
                  :class="ratingColor(contrastRatio(row.hex, col.hex) ?? 0)"
                >
                  {{ ratingLabel(contrastRatio(row.hex, col.hex) ?? 0) }}
                </span>
              </template>
              <span
                v-else
                class="text-muted/30"
              >—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-xs text-muted mt-2">
      AA = 4.5:1 min (texte normal) · AA+ = 3:1 (gros texte) · AAA = 7:1 (optimal)
    </p>
  </div>
  <p
    v-else
    class="text-sm text-muted"
  >
    Saisissez au moins 2 couleurs hexadécimales pour voir la matrice de contraste.
  </p>
</template>
