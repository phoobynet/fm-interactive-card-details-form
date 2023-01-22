<script
  lang="ts"
  setup
>
import { MaskInputOptions } from 'maska'
import { padStart, trimStart } from 'lodash'
import { ref, watch } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const expiryMonth = ref<string>('')
const error = ref<string>('')

const stripLeadingZero = (val: string | undefined) => trimStart((val || '').trim(), '0')

const addLeadingZero = (val: string | number | undefined) => {
  if (val === undefined) {
    return ''
  }

  const s = val.toString()
  return s.length < 2
    ? padStart(val.toString(), 2, '0')
    : s
}

const isValidMonth = (val: string | number | undefined) => {
  if (val === undefined) {
    return false
  }

  let n: number
  if (typeof val === 'string') {
    n = parseInt(stripLeadingZero(val))
  } else {
    n = val
  }

  return n > 0 && n <= 12
}

const toInt = (val: string): number | undefined => {
  const n = parseInt(val)

  return isNaN(n)
    ? undefined
    : n
}

const options: MaskInputOptions = {
  preProcess: stripLeadingZero,
  eager: true,
  postProcess: val => {
    val = stripLeadingZero(val)

    if (!isValidMonth(val)) {
      return ''
    }

    return val
  },
}

// insert leading zero values when missing
const blurHandler = (e: InputEvent) => {
  const input = e.currentTarget as HTMLInputElement
  const v = toInt(input.value)

  if (isValidMonth(v)) {
    expiryMonth.value = addLeadingZero(v)
  }
}

watch(expiryMonth, (newValue, oldValue) => {
  error.value = ''

  if (isValidMonth(newValue) && newValue !== oldValue) {
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', '')

    if (newValue === '') {
      error.value = `Cant' be blank`
    } else {
      error.value = 'Invalid month'
    }
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

