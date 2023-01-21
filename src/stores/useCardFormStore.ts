import { defineStore } from 'pinia'
import { addYears, format } from 'date-fns'

const now = new Date()

const startYear = format(now, 'yy')
const endYear = format(addYears(now, 10), 'yy')

export interface CardForm {
  cardholderName: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvc: string
}

export interface CardFormState extends CardForm {
  cardholderNameDirty: boolean
  cardNumberDirty: boolean
  expiryMonthDirty: boolean
  expiryYearDirty: boolean
  cvcDirty: boolean
  cardholderNameError: string
  cardNumberError: string
  expiryMonthError: string
  expiryYearError: string
  cvcError: string
}

export const useCardFormStore = defineStore('cardFormStore', {
  state: (): CardFormState => {
    return {
      cardholderNameDirty: true,
      cardNumberDirty: true,
      expiryMonthDirty: true,
      expiryYearDirty: true,
      cvcDirty: true,
      cardholderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',

      cardholderNameError: '',
      cardNumberError: '',
      expiryMonthError: '',
      expiryYearError: '',
      cvcError: '',
    }
  },

  getters: {
    isValid ({
      cardholderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      cardholderNameError,
      cardNumberError,
      expiryMonthError,
      expiryYearError,
      cvcError,
    }) {
      const fieldsCompleted = [cardholderName, cardNumber, expiryMonth, expiryYear, cvc].every(
        x => !!(x || '').trim().length)

      const fieldsValid = [cardholderNameError, cardNumberError, expiryMonthError, expiryYearError, cvcError].every(
        x => !(x || '').trim().length)

      return fieldsCompleted && fieldsValid
    },

    expiryError (): string {
      return this.expiryMonthError || this.expiryYearError
    },
  },

  actions: {
    async validate (newValues: CardForm, oldValues: CardForm): Promise<void> {
      this.cardholderNameError = ''
      this.cardNumberError = ''
      this.expiryMonthError = ''
      this.expiryYearError = ''
      this.cvcError = ''

      if (!this.cardholderNameDirty && this.cardholderName !== newValues.cardholderName) {
        this.cardholderNameDirty = true
      }

      if (!this.cardNumberDirty && this.cardNumber !== newValues.cardNumber) {
        this.cardNumberDirty = true
      }

      if (!this.expiryMonthDirty && this.expiryMonth !== newValues.expiryMonth) {
        this.expiryMonthDirty = true
      }

      if (!this.expiryYearDirty && this.expiryYear !== newValues.expiryYear) {
        this.expiryYearDirty = true
      }

      if (!this.cvcDirty && this.cvc !== newValues.cvc) {
        this.cvcDirty = true
      }

      //region Cardholder Name validation
      if (!newValues.cardholderName.length && (!!oldValues.cardholderName.length || this.cardholderNameDirty)) {
        this.cardholderNameError = `Can't be blank`
      } else if (newValues.cardholderName.length > 100) {
        this.cardholderNameError = 'Max length is 100'
      }
      //endregion

      //region Card Number
      if (!newValues.cardNumber.length && !!oldValues.cardNumber.length) {
        this.cardNumberError = `Can't be blank`
      } else if (newValues.cardNumber.length) {
        if (!/^\d+$/.test(newValues.cardNumber)) {
          this.cardNumberError = 'Wrong format, numbers only'
        } else if (newValues.cardNumber.length !== 16) {
          this.cardNumberError = 'Incomplete number'
        }
      }
      //endregion

      //region qs
      if (!newValues.expiryMonth.length && !!oldValues.expiryMonth.length) {
        this.expiryMonth = `Can't be blank`
      } else if (newValues.expiryMonth) {
        const expiryMonth = parseInt(newValues.expiryMonth)
        const expiryYear = parseInt(newValues.expiryYear)

        const invalidMonth = isNaN(expiryMonth) || expiryMonth > 12 || expiryMonth <= 0
        const invalidYear = isNaN(expiryYear) || newValues.expiryYear < startYear || newValues.expiryYear > endYear

        if (invalidMonth && !invalidYear) {
          this.expiryMonthError = 'Invalid month'
        } else if (invalidMonth && invalidYear) {
          this.expiryMonthError = 'Invalid month/year'
        } else if (invalidYear) {
          this.expiryYearError = 'Invalid year'
        }
      }
      //endregion
    },
  },
})
