<script
  lang="ts"
  setup
>
import { reactive, ref, watch } from 'vue'
import { MaskaDetail } from 'maska'
import InputError from '@/components/InputError.vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const value = ref<string>(props.modelValue)
const error = ref<string>()
const isDirty = ref<boolean>(false)

const bindingObject = reactive<MaskaDetail>({
  completed: false,
  masked: '',
  unmasked: '',
})

watch(() => bindingObject.unmasked, (newValue) => {
  if (newValue?.length !== 16) {
    error.value = 'Invalid card number'
    emit('update:modelValue', '')
  } else if (isDirty.value && !newValue?.length) {
    emit('update:modelValue', '')
    error.value = `Can't be blank`
  } else {
    emit('update:modelValue', newValue)
    error.value = ''
  }
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
      :data-invalid="!!error"
      @keyup="() => isDirty = true"
    >
    <InputError :error="error" />
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

