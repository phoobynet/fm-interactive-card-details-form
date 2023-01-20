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

const expiryMonth = computed({
  get () {
    return form.expiryMonth.value
  },
  set (value) {
    form.expiryMonth.value = value
  },
})

const expiryYear = computed({
  get () {
    return form.expiryYear.value
  },
  set (value) {
    form.expiryYear.value = value
  },
})

const error = computed(() => {
  if (errors.expiryMonth.value) {
    return errors.expiryMonth.value
  } else if (errors.expiryYear.value) {
    return errors.expiryYear.value
  }
  return ''
})
</script>

<template>
  <div class="card-expiry">
    <label for="expiryMonth">exp. date (MM/YY)</label>
    <div class="inputs">
      <input
        id="expiryMonth"
        type="text"
        v-model="expiryMonth"
        placeholder="MM"
      >
      <input
        id="expiryYear"
        type="text"
        v-model="expiryYear"
        placeholder="YY"
      >
    </div>
    <InputError :error="error" />
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

