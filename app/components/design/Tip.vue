<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <UTooltip :text="content">
    <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-help shrink-0">
      ?
    </span>
  </UTooltip>
</template>
