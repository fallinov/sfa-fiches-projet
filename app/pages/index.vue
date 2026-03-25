<script setup lang="ts">
import t from '~/i18n/fr'

const fiches = [
  {
    title: t.dashboard.cadrage.title,
    description: t.dashboard.cadrage.description,
    phase: 'Phase 1',
    icon: 'i-lucide-target',
    to: '/cadrage',
    active: true
  },
  {
    title: t.dashboard.cardSorting.title,
    description: t.dashboard.cardSorting.description,
    phase: 'Phase 2',
    icon: 'i-lucide-layout-grid',
    to: '/card-sorting',
    active: true
  },
  {
    title: t.dashboard.design.title,
    description: t.dashboard.design.description,
    phase: 'Phase 3',
    icon: 'i-lucide-palette',
    to: '/design',
    active: false
  },
  {
    title: t.dashboard.maquettes.title,
    description: t.dashboard.maquettes.description,
    phase: 'Phase 5',
    icon: 'i-lucide-frame',
    to: '/maquettes',
    active: false
  },
  {
    title: t.dashboard.checklist.title,
    description: t.dashboard.checklist.description,
    phase: 'Phase 9',
    icon: 'i-lucide-check-square',
    to: '/checklist',
    active: false
  }
]
</script>

<template>
  <div>
    <header class="text-center mb-10">
      <p class="text-sm font-semibold text-muted uppercase tracking-wider">
        {{ t.app.institution }}
      </p>
      <h1 class="text-2xl sm:text-3xl font-bold text-default mt-1">
        {{ t.dashboard.title }}
      </h1>
      <p class="text-base text-muted mt-2 max-w-lg mx-auto">
        {{ t.dashboard.subtitle }}
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="fiche in fiches"
        :key="fiche.to"
        :to="fiche.active ? fiche.to : undefined"
        :class="fiche.active ? 'hover:ring-2 hover:ring-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'"
        class="block"
      >
        <UCard class="h-full transition-shadow">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon
                :name="fiche.icon"
                class="w-5 h-5 text-primary"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold truncate">
                  {{ fiche.title }}
                </h2>
                <UBadge
                  v-if="!fiche.active"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  {{ t.dashboard.comingSoon }}
                </UBadge>
              </div>
              <p class="text-xs text-muted mt-0.5">
                {{ fiche.phase }}
              </p>
              <p class="text-sm text-muted mt-1">
                {{ fiche.description }}
              </p>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
