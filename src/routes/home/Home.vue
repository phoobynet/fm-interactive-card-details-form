<script
  setup
  lang="ts"
>
import CardholderName from '@/components/CardholderName.vue'
import CardNumber from '@/components/CardNumber.vue'
import CardCvc from '@/components/CardCvc.vue'
import CardExpiry from '@/components/CardExpiry.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'
import { useCardFormStore } from '@/stores/useCardFormStore'
import { debouncedWatch } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const store = useCardFormStore()

const {
  cardholderName,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
} = storeToRefs(store)

debouncedWatch(
  [cardholderName, cardNumber, expiryMonth, expiryYear, cvc],
  async (
    [newCardholderName, newCardNumber, newExpiryMonth, newExpiryYear, newCvc],
    [oldCardholderName, oldCardNumber, oldExpiryMonth, oldExpiryYear, oldCvc],
  ) => {
    await store.validate({
      cardholderName: newCardholderName,
      cardNumber: newCardNumber,
      expiryMonth: newExpiryMonth,
      expiryYear: newExpiryYear,
      cvc: newCvc,
    }, {
      cardholderName: oldCardholderName,
      cardNumber: oldCardNumber,
      expiryMonth: oldExpiryMonth,
      expiryYear: oldExpiryYear,
      cvc: oldCvc,
    })
  }, {
    debounce: 500,
  },
)

const submitHandler = () => {
  console.log('Form submitted')
}

const confirmHandler = () => {}

</script>

<template>
  <div class="container">
    <main>
      <p>cardholderNameError: {{ store.cardholderNameError }}</p>
      <form
        @submit.prevent="submitHandler"
        class="card-form"
      >
        <CardholderName />
        <CardNumber />
        <div class="expiry-cvc">
          <CardExpiry />
          <CardCvc />
        </div>
        <div class="confirm-container">
          <ConfirmButton @click="confirmHandler">Confirm</ConfirmButton>
        </div>
      </form>
    </main>
  </div>
</template>

<style
  scoped
  lang="scss"
>
  pre {
    font-size: 9px;
  }

  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/images/bg-main-mobile.png');
    background-repeat: repeat-x;
    padding-top: 20.4rem;

    main {
      max-width: 327px;

      .card-form {
        position: relative;
        display: grid;
        grid-template-rows: repeat(3, auto);
        grid-row-gap: .9rem;

        .expiry-cvc {
          display: grid;
          grid-template-columns: auto auto;
          grid-column-gap: 0.5rem;
        }

        .confirm-container {
          padding-top: .8rem;
        }
      }
    }
  }
</style>
