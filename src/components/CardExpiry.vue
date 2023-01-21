<script
  lang="ts"
  setup
>
import CardExpiryMonthInput from '@/components/CardExpiryMonthInput.vue'
import CardExpiryYearInput from '@/components/CardExpiryYearInput.vue'
import { useCardFormStore } from '@/stores/useCardFormStore'
import InputError from '@/components/InputError.vue'

const store = useCardFormStore()

const { expiryError } = store
</script>

<template>
  <div class="card-expiry">
    <label for="expiryMonth">exp. date (MM/YY)</label>
    <div class="inputs">
      <CardExpiryMonthInput />
      <CardExpiryYearInput />
    </div>
    <span>

    {{ expiryError}}
    </span>
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

