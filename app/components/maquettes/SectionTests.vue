<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addUserTest, removeUserTest } = useMaquettesData()

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addUserTest()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.maquettes.sections.tests.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.maquettes.sections.tests.description }}
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(test, index) in formData.userTests"
        :key="test.id"
        class="border border-default rounded-lg p-4"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-bold text-sm text-primary">
            {{ t.maquettes.sections.tests.testLabel }} {{ index + 1 }}
          </span>
          <UButton
            v-if="formData.userTests.length > 1"
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="`Supprimer test ${index + 1}`"
            @click="removeUserTest(test.id)"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UFormField :label="t.maquettes.sections.tests.participant">
            <UInput
              v-model="test.participant"
              :placeholder="t.maquettes.sections.tests.participantPlaceholder"
              class="w-full"
            />
          </UFormField>
          <UFormField :label="t.maquettes.sections.tests.testType">
            <UInput
              v-model="test.testType"
              :placeholder="t.maquettes.sections.tests.testTypePlaceholder"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="t.maquettes.sections.tests.findings"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="test.findings"
              :rows="2"
              :placeholder="t.maquettes.sections.tests.findingsPlaceholder"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>
    </div>

    <UButton
      :label="t.maquettes.sections.tests.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addUserTest()"
    />

    <UFormField
      :label="t.maquettes.sections.tests.iterations"
      class="mt-6"
    >
      <UTextarea
        v-model="formData.iterations"
        :rows="3"
        :placeholder="t.maquettes.sections.tests.iterationsPlaceholder"
        class="w-full"
      />
    </UFormField>
  </UCard>
</template>
