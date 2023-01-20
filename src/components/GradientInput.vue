<script
  lang="ts"
  setup
>
</script>

<template>
  <div class="input-container">
    <input type="text">
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .input-container {
    position: relative;
    background: var(--clr-light-gray);
    border-radius: 0.5rem;
    height: 48px;

    &:hover {
      background: var(--input-gradient);
    }

    input {
      all: unset;

      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: white;
      border-radius: 0.5rem;
    }
  }
</style>

