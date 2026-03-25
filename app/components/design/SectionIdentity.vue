<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useDesignData()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.design.sections.identity.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.design.sections.identity.description }}
        </p>
      </div>
    </template>

    <UFormField :label="t.design.sections.identity.label">
      <UTextarea
        v-model="formData.visualIdentity"
        :rows="6"
        :placeholder="t.design.sections.identity.placeholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
