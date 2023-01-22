<script
  lang="ts"
  setup
>
import { ref, watch } from 'vue'

const MIN_LENGTH = 3
const MAX_LENGTH = 4

defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const isDirty = ref<boolean>(false)
const value = ref<string>('')
const error = ref<string>('')
const validate = /^[0-9]{3, 4}$/

watch(value, (newValue, oldValue) => {
  if (newValue !== oldValue && validate.test(newValue)) {
    emit('update:modelValue', newValue)
  }
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
      v-maska
      data-maska="###"
      autocomplete="off"
      :minlength="MIN_LENGTH"
      :maxlength="MAX_LENGTH"
      @keyup="()=> isDirty = true"
    >
  </div>
</template>

<style
  lang="scss"
  scoped
>
</style>

