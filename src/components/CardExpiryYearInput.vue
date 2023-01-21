<script
  lang="ts"
  setup
>
import { useCardFormStore } from '@/stores/useCardFormStore'
import { storeToRefs } from 'pinia'

const store = useCardFormStore()

const {
  expiryYear,
  expiryYearError,
  expiryYearDirty
} = storeToRefs(store)

</script>

<template>
  <input
    id="expiryYear"
    type="text"
    v-model="expiryYear"
    placeholder="YY"
    v-maska
    data-maska="##"
    autocomplete="off"
    :data-invalid="!!expiryYearError && expiryYearDirty"
  >
</template>

<style
  lang="scss"
  scoped
>
</style>

