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
    return form.cardholderName.value
  },
  set (value) {
    form.cardholderName.value = value
  },
})

</script>

<template>
  <div class="label-input-group">
    <label for="cardholderName">cardholder name</label>

    <input
      id="cardholderName"
      type="text"
      v-model="value"
      placeholder="e.g. Jane Appleseed"
    >
    <InputError :error="errors.cardholderName.value" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

