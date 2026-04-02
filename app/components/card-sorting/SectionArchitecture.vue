<script setup lang="ts">
import t from '~/i18n/fr'

const { formData, addArchitectureNode, removeArchitectureNode } = useCardSortingData()

const MAX_DEPTH = 3

function canIndent(index: number): boolean {
  if (index === 0) return false
  const node = formData.value.architecture[index]
  const prev = formData.value.architecture[index - 1]
  if (!node || !prev) return false
  return node.depth < MAX_DEPTH && node.depth <= prev.depth
}

function canOutdent(index: number): boolean {
  return (formData.value.architecture[index]?.depth ?? 0) > 0
}

function indent(index: number) {
  const node = formData.value.architecture[index]
  if (node && canIndent(index)) node.depth++
}

function outdent(index: number) {
  const node = formData.value.architecture[index]
  if (node && canOutdent(index)) node.depth--
}

function moveUp(index: number) {
  if (index <= 0) return
  const nodes = formData.value.architecture
  ;[nodes[index - 1], nodes[index]] = [nodes[index]!, nodes[index - 1]!]
}

function moveDown(index: number) {
  const nodes = formData.value.architecture
  if (index >= nodes.length - 1) return
  ;[nodes[index], nodes[index + 1]] = [nodes[index + 1]!, nodes[index]!]
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    addArchitectureNode()
  }
}
</script>

<template>
  <UCard @keydown="handleKeydown">
    <template #header>
      <div>
        <h2 class="text-lg font-bold">
          {{ t.cardSorting.sections.architecture.title }}
        </h2>
        <p class="text-sm lg:text-base text-muted mt-0.5">
          {{ t.cardSorting.sections.architecture.description }}
        </p>
      </div>
    </template>

    <div class="space-y-2">
      <div
        v-for="(node, index) in formData.architecture"
        :key="node.id"
        class="flex items-center gap-1"
        :style="{ marginLeft: `${node.depth * 24}px` }"
      >
        <span
          v-if="node.depth > 0"
          class="text-muted mr-1 select-none"
        >
          └
        </span>

        <UInput
          v-model="node.label"
          :placeholder="t.cardSorting.sections.architecture.placeholder"
          size="sm"
          class="flex-1"
        />

        <div class="flex items-center gap-0.5 shrink-0">
          <UButton
            icon="i-lucide-indent-decrease"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="!canOutdent(index)"
            :aria-label="t.cardSorting.sections.architecture.outdent"
            @click="outdent(index)"
          />
          <UButton
            icon="i-lucide-indent-increase"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="!canIndent(index)"
            :aria-label="t.cardSorting.sections.architecture.indent"
            @click="indent(index)"
          />
          <UButton
            icon="i-lucide-arrow-up"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === 0"
            :aria-label="t.cardSorting.sections.architecture.moveUp"
            @click="moveUp(index)"
          />
          <UButton
            icon="i-lucide-arrow-down"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === formData.architecture.length - 1"
            :aria-label="t.cardSorting.sections.architecture.moveDown"
            @click="moveDown(index)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="formData.architecture.length <= 1"
            :aria-label="t.cardSorting.sections.architecture.remove"
            @click="removeArchitectureNode(node.id)"
          />
        </div>
      </div>
    </div>

    <UButton
      :label="t.cardSorting.sections.architecture.add"
      icon="i-lucide-plus"
      variant="outline"
      color="primary"
      class="mt-4"
      @click="addArchitectureNode()"
    />
  </UCard>
</template>
