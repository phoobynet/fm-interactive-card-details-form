<script
  lang="ts"
  setup
>
import InputError from '@/components/InputError.vue'
import { ref, watch } from 'vue'

const MAX_LENGTH = 100

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const value = ref<string | undefined>(props.modelValue)
const error = ref<string>()
const isDirty = ref<boolean>(false)

watch(value, (newValue) => {
  error.value = ''
  if (newValue?.length) {
    emit('update:modelValue', newValue)
  } else if (isDirty.value && !newValue?.length) {
    emit('update:modelValue', '')
    error.value = `Can't be blank`
  }
})

</script>

<template>
  <div class="label-input-group">
    <label for="cardholderName">cardholder name</label>

    <input
      id="cardholderName"
      type="text"
      v-model="value"
      autocomplete="off"
      placeholder="e.g. Jane Appleseed"
      :maxlength="MAX_LENGTH"
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

