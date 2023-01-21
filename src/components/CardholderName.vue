<script
  lang="ts"
  setup
>
import { useCardFormStore } from '@/stores/useCardFormStore'
import { storeToRefs } from 'pinia'
import InputError from '@/components/InputError.vue'

const MAX_LENGTH = 100

const store = useCardFormStore()

const { cardholderName, cardholderNameError } = storeToRefs(store)

</script>

<template>
  <div class="label-input-group">
    <label for="cardholderName">cardholder name</label>

    <input
      id="cardholderName"
      type="text"
      v-model="cardholderName"
      autocomplete="off"
      placeholder="e.g. Jane Appleseed"
      :maxlength="MAX_LENGTH"
      :data-invalid="!!cardholderNameError"
    >
    <InputError :error="cardholderNameError" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

