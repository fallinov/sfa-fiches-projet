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
  title: t.app.title,
  description: t.app.subtitle
})
</script>

<template>
  <UApp>
    <UMain>
      <div class="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <NuxtPage />
      </div>
    </UMain>

    <footer class="print-hidden text-center text-sm text-muted py-4 border-t border-default">
      {{ t.footer.text }}
    </footer>
  </UApp>
</template>
