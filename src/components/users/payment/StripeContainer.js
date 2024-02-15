import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51NmYJ0SEt3YVmUE8lIfN4xBD9QiuNk0MnxK1BTcwIixkzOExbyL6svP9xrZfEWS279qvC3vEWRdY40hSPe3bczG100I80ExmvN"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>     
    </Elements>
  )
}

export default StripeContainer
