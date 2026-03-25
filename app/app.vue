<script setup lang="ts">
import t from '~/i18n/fr'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

useSeoMeta({
  title: t.dashboard.title,
  description: t.dashboard.subtitle
})

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '')
</script>

<template>
  <UApp>
    <UMain>
      <div class="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <!-- Back to dashboard link on form pages -->
        <div
          v-if="!isHome"
          class="print-hidden mb-4"
        >
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1 text-sm text-muted hover:text-default transition-colors"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="w-4 h-4"
            />
            {{ t.dashboard.title }}
          </NuxtLink>
        </div>

        <NuxtPage />
      </div>
    </UMain>

    <footer class="print-hidden text-center text-sm text-muted py-4 border-t border-default">
      {{ t.footer.text }}
    </footer>
  </UApp>
</template>
