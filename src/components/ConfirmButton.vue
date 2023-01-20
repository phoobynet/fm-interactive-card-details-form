<script
  lang="ts"
  setup
>
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="() => emit('click')" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style
  lang="scss"
  scoped
>
  button {
    background-color: var(--clr-deep-violet);
    height: 53px;
    border-radius: 0.5rem;
    color: white;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    min-width: 100%;
  }
</style>

