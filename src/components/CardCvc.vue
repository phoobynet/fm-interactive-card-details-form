<script
  lang="ts"
  setup
>
import { useCardFormStore } from '@/stores/useCardFormStore'
import { storeToRefs } from 'pinia'

const store = useCardFormStore()

const { cvc } = storeToRefs(store)
</script>

<template>
  <div class="cvc-group">
    <label for="cvc">cvc</label>
    <input
      id="cvc"
      type="text"
      v-model="cvc"
      placeholder="e.g. 123"
      v-maska
      data-maska="###"
      autocomplete="off"
    >
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

