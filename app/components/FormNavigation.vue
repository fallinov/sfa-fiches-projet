<script setup lang="ts">
import t from '~/i18n/fr'

const route = useRoute()

const fiches = [
  { path: '/cadrage', label: t.dashboard.cadrage.title, phase: 'Phase 1' },
  { path: '/card-sorting', label: t.dashboard.cardSorting.title, phase: 'Phase 2' },
  { path: '/design', label: t.dashboard.design.title, phase: 'Phase 3' },
  { path: '/maquettes', label: t.dashboard.maquettes.title, phase: 'Phase 5' },
  { path: '/checklist', label: t.dashboard.checklist.title, phase: 'Phase 9' }
]

const currentIndex = computed(() =>
  fiches.findIndex(f => route.path.endsWith(f.path) || route.path.endsWith(`${f.path}/`))
)

const prev = computed(() => currentIndex.value > 0 ? fiches[currentIndex.value - 1] : null)
const next = computed(() => currentIndex.value < fiches.length - 1 ? fiches[currentIndex.value + 1] : null)
</script>

<template>
  <nav
    class="print-hidden flex items-center justify-between gap-4 mt-8 pt-6 border-t border-default"
    aria-label="Navigation entre les fiches"
  >
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="flex items-center gap-2 text-sm text-muted hover:text-default transition-colors"
    >
      <UIcon
        name="i-lucide-arrow-left"
        class="w-4 h-4"
      />
      <div>
        <p class="text-xs text-muted">
          {{ prev.phase }}
        </p>
        <p class="font-medium">
          {{ prev.label }}
        </p>
      </div>
    </NuxtLink>
    <div v-else />

    <NuxtLink
      v-if="next"
      :to="next.path"
      class="flex items-center gap-2 text-sm text-muted hover:text-default transition-colors text-right"
    >
      <div>
        <p class="text-xs text-muted">
          {{ next.phase }}
        </p>
        <p class="font-medium">
          {{ next.label }}
        </p>
      </div>
      <UIcon
        name="i-lucide-arrow-right"
        class="w-4 h-4"
      />
    </NuxtLink>
    <div v-else />
  </nav>
</template>
