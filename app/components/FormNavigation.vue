<script setup lang="ts">
import t from '~/i18n/fr'

const route = useRoute()

const fiches = [
  { path: '/cadrage', label: t.dashboard.cadrage.title, phase: 'Phase 1', courseUrl: 'https://devjs.ch/preparer-projet-web/01-cadrage' },
  { path: '/card-sorting', label: t.dashboard.cardSorting.title, phase: 'Phase 2', courseUrl: 'https://devjs.ch/preparer-projet-web/02-architecture' },
  { path: '/design', label: t.dashboard.design.title, phase: 'Phase 3', courseUrl: 'https://devjs.ch/preparer-projet-web/03-design' },
  { path: '/maquettes', label: t.dashboard.maquettes.title, phase: 'Phase 5', courseUrl: 'https://devjs.ch/preparer-projet-web/05-maquettes' },
  { path: '/checklist', label: t.dashboard.checklist.title, phase: 'Phase 9', courseUrl: 'https://devjs.ch/preparer-projet-web/09-checklist' }
]

const currentFiche = computed(() => currentIndex.value >= 0 ? fiches[currentIndex.value] : null)

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

  <div
    v-if="currentFiche"
    class="print-hidden flex justify-center mt-3"
  >
    <a
      :href="currentFiche.courseUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="text-xs text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
    >
      Voir le cours sur devjs.ch
      <UIcon
        name="i-lucide-arrow-up-right"
        class="w-3 h-3"
      />
    </a>
  </div>
</template>
