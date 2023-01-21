<script
  lang="ts"
  setup
>
defineProps<{ error?: string }>()
</script>

<template>
  <div
    class="input-error"
    v-if="!!error"
  >{{ error }}
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .input-error {
    color: var(--clr-error);
    font-size: 12px;
    padding-top: .5rem;
  }
</style>

