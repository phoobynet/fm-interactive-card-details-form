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
    return form.cvc.value
  },
  set (value) {
    form.cvc.value = value
  },
})
</script>

<template>
  <div class="cvc-group">
    <label for="cvc">cvc</label>
    <input
      id="cvc"
      type="text"
      v-model="value"
      placeholder="e.g. 123"
    >
    <InputError :error="errors.cvc.value" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

