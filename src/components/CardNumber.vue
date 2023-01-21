<script
  lang="ts"
  setup
>
import { reactive, ref, watch } from 'vue'
import { MaskaDetail } from 'maska'
import { useCardFormStore } from '@/stores/useCardFormStore'
import { storeToRefs } from 'pinia'
import InputError from '@/components/InputError.vue'

const store = useCardFormStore()

const {
  cardNumber,
  cardNumberError,
} = storeToRefs(store)
const value = ref<string>(cardNumber.value)

const bindingObject = reactive<MaskaDetail>({
  completed: false,
  masked: '',
  unmasked: '',
})

watch(() => bindingObject.unmasked, (newValue) => {
  store.$patch({
    cardNumber: newValue,
  })
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
      v-maska="bindingObject"
      data-maska="#### #### #### ####"
      autocomplete="off"
      :data-invalid="!!cardNumberError"
    >
    <InputError :error="cardNumberError" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

