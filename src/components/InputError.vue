<script
  lang="ts"
  setup
>
defineProps<{ error?: string }>()
</script>

<template>
  <span
    class="input-error"
    v-if="!!error"
  >{error}</span>
</template>

<style
  lang="scss"
  scoped
>
  .input-error {
    color: var(--clr-error);
  }
</style>

