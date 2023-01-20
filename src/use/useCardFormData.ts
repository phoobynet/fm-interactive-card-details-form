import { reactive, toRefs } from 'vue'
import { CardFormData } from '@/types/CardFormData'

const cardFormData = reactive<CardFormData>({
  cardholderName: '',
  cardNumber: '',
  expiryYear: '',
  expiryMonth: '',
  cvc: '',
})

const cardFormDataError = reactive<CardFormData>({
  cardholderName: '',
  cardNumber: '',
  expiryYear: '',
  expiryMonth: '',
  cvc: '',
})

export const useCardFormData = () => {
  return {
    form: {
      ...toRefs(cardFormData),
    },
    errors: {
      ...toRefs(cardFormDataError),
    },
  }
}
