<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useFormData()
</script>

<template>
  <header class="text-center mb-6">
    <h1 class="text-2xl font-bold text-default">
      {{ t.app.title }}
    </h1>
    <p class="text-base font-bold text-primary">
      {{ t.app.subtitle }}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <UFormField :label="t.header.lastName">
        <UInput
          v-model="formData.studentLastName"
          :placeholder="t.header.lastNamePlaceholder"
        />
      </UFormField>

      <UFormField :label="t.header.firstName">
        <UInput
          v-model="formData.studentFirstName"
          :placeholder="t.header.firstNamePlaceholder"
        />
      </UFormField>

      <UFormField :label="t.header.date">
        <UInput
          v-model="formData.date"
          type="date"
        />
      </UFormField>
    </div>
  </header>
</template>
