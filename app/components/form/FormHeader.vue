<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useFormData()
</script>

<template>
  <header class="text-center mb-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-default">
      {{ t.app.title }}
    </h1>
    <p class="text-base font-semibold text-primary mt-1">
      {{ t.app.subtitle }}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-left">
      <UFormField :label="t.header.lastName">
        <UInput
          v-model="formData.studentLastName"
          :placeholder="t.header.lastNamePlaceholder"
          class="w-full"
          autocomplete="family-name"
        />
      </UFormField>

      <UFormField :label="t.header.firstName">
        <UInput
          v-model="formData.studentFirstName"
          :placeholder="t.header.firstNamePlaceholder"
          class="w-full"
          autocomplete="given-name"
        />
      </UFormField>

      <UFormField :label="t.header.date">
        <UInput
          v-model="formData.date"
          type="date"
          class="w-full"
        />
      </UFormField>
    </div>
  </header>
</template>
