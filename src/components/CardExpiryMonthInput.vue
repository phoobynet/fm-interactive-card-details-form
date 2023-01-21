<script
  lang="ts"
  setup
>
import { MaskInputOptions } from 'maska'
import { padStart, trimStart } from 'lodash'
import { useCardFormStore } from '@/stores/useCardFormStore'
import { storeToRefs } from 'pinia'

const store = useCardFormStore()

const { expiryMonth, expiryMonthError, expiryMonthDirty } = storeToRefs(store)

const options: MaskInputOptions = {
  preProcess: val => {
    return trimStart((val || '').trim(), '0')
  },
  eager: true,
  postProcess: val => {
    val = trimStart((val || '').trim(), '0')

    const numberVal = parseInt(val)

    if (isNaN(numberVal)) {
      return ''
    }

    if (numberVal < 10) {
      val = padStart(val, 2, '0')
    }

    return val
  },
}

// insert leading zero values when missing
const blurHandler = (e: InputEvent) => {
  const input = e.currentTarget as HTMLInputElement

  const v = parseInt(input.value)

  if (v < 12 && v > 0) {
    store.$patch({
      expiryMonth: padStart(v.toString(), 2, '0'),
    })
  }
}

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

