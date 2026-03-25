<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useFormData()

onMounted(() => {
  if (!formData.value.date) {
    formData.value.date = new Date().toISOString().slice(0, 10)
  }
})
</script>

<template>
  <header class="mb-8">
    <div class="text-center mb-6">
      <p class="text-sm font-semibold text-muted uppercase tracking-wider">
        {{ t.app.institution }}
      </p>
      <h1 class="text-2xl sm:text-3xl font-bold text-default mt-1">
        {{ t.app.title }}
      </h1>
      <p class="text-base font-semibold text-primary mt-1">
        {{ t.app.subtitle }}
      </p>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-lg font-bold">
          {{ t.header.sectionTitle }}
        </h2>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    </UCard>
  </header>
</template>
