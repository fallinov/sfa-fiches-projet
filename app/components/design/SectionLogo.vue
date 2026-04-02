<script setup lang="ts">
import t from '~/i18n/fr'

defineProps<{
  readOnly?: boolean
}>()

const { formData } = useDesignData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold">
            {{ t.design.sections.logo.title }}
          </h2>
          <DesignTip :content="t.design.sections.logo.tip" />
        </div>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.logo.description }}
        </p>
      </div>
    </template>

    <ImageUpload
      v-model="formData.logoUrl"
      :read-only="readOnly"
      label="Logo"
    />
  </UCard>
</template>
