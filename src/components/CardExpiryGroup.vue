<script
  lang="ts"
  setup
>
import InputError from '@/components/InputError.vue'

defineProps<{ expiryError?: string }>()
</script>

<template>
  <div class="card-expiry">
    <label for="expiryMonth">exp. date (MM/YY)</label>
    <div class="inputs">
      <slot>
      </slot>
    </div>
    <InputError :error="expiryError" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .card-expiry {
    .inputs {
      display: grid;
      grid-template-columns: repeat(2, 72px);
      grid-column-gap: 0.5rem;
    }
  }
</style>

