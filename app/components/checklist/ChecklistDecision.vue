<script setup lang="ts">
import t from '~/i18n/fr'

const { formData } = useChecklistData()

const decisionItems = [
  { label: t.checklist.decisions.ready, value: 'ready' },
  { label: t.checklist.decisions.reservations, value: 'reservations' },
  { label: t.checklist.decisions.corrections, value: 'corrections' }
]
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-bold">
        {{ t.checklist.validation.title }}
      </h2>
    </template>

    <div class="space-y-4">
      <UFormField :label="t.checklist.validation.exceptions">
        <UTextarea
          v-model="formData.exceptions"
          :rows="2"
          :placeholder="t.checklist.validation.exceptionsPlaceholder"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="t.checklist.validation.knownBugs">
        <UTextarea
          v-model="formData.knownBugs"
          :rows="2"
          :placeholder="t.checklist.validation.knownBugsPlaceholder"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormField :label="t.checklist.validation.testedDevices">
          <UTextarea
            v-model="formData.testedDevices"
            :rows="2"
            :placeholder="t.checklist.validation.testedDevicesPlaceholder"
            class="w-full"
          />
        </UFormField>

        <UFormField :label="t.checklist.validation.testedBrowsers">
          <UTextarea
            v-model="formData.testedBrowsers"
            :rows="2"
            :placeholder="t.checklist.validation.testedBrowsersPlaceholder"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField :label="t.checklist.validation.decision">
        <USelect
          v-model="formData.decision"
          :items="decisionItems"
          :placeholder="t.checklist.validation.decisionPlaceholder"
          class="w-full"
        />
      </UFormField>
    </div>
  </UCard>
</template>
