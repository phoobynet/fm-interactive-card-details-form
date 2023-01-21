<script
  lang="ts"
  setup
>
import { MaskInputOptions } from 'maska'
import { padStart, trimStart } from 'lodash'
import { ref, watch } from 'vue'

defineProps<{ modelValue: string }>()
const expiryMonth = ref<string>('')
const error = ref<string>('')
const emit = defineEmits(['update:modelValue'])

const unformat = (val: string) => trimStart((val || '').trim(), '0')
const format = (val: string | number) => {
  const s = val.toString()
  return s.length < 2 ? padStart(val.toString(), 2, '0') : s
}

const isValid = (val: string | number) => {
  let n: number
  if (typeof val === 'string') {
    n = parseInt(unformat(val))
  } else {
    n = val
  }

  return n > 0 && n <= 12
}

const options: MaskInputOptions = {
  preProcess: unformat,
  eager: true,
  postProcess: val => {
    val = unformat(val)

    if (!isValid(val)) {
      return ''
    }

    return val
  },
}

// insert leading zero values when missing
const blurHandler = (e: InputEvent) => {
  const input = e.currentTarget as HTMLInputElement

  const v = parseInt(input.value)

  if (v < 12 && v > 0) {
    expiryMonth.value = format(v)
  }
}

watch(expiryMonth, (newValue, oldValue) => {
  error.value = ''

  if (isValid(newValue)) {
    emit('update:modelValue', newValue)
  }
})

</script>

<template>
  <input
    id="expiryMonth"
    type="text"
    v-model="expiryMonth"
    placeholder="MM"
    v-maska="options"
    data-maska="##"
    autocomplete="off"
    @blur="blurHandler"
    :data-invalid="!!expiryMonthError && expiryMonthDirty"
  >
</template>

<style
  lang="scss"
  scoped
>
</style>

