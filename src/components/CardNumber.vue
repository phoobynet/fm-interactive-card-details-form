<script
  lang="ts"
  setup
>
import { useCardFormData } from '@/use/useCardFormData'
import InputError from '@/components/InputError.vue'
import { computed } from 'vue'

const {
  form,
  errors,
} = useCardFormData()

const value = computed({
  get () {
    return form.cardNumber.value
  },
  set (value) {
    form.cardNumber.value = value
  },
})

</script>

<template>
  <div class="label-input-group">
    <label for="cardNumber">card number</label>
    <input
      id="cardNumber"
      type="text"
      v-model="value"
      placeholder="e.g. 1234 5678 9123 0000"
    >
    <InputError :error="errors.cardNumber.value" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

