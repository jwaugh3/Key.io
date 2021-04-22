import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const PaymentForm = ({token, shippingData, backStep, nextStep, onCaptureCheckout, timeout}) => {

    const stripePromise = loadStripe(' ... ')

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault()

        if(!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if(error) {
            console.log(error) 
            timeout()
            nextStep()
        }
        else {
            const orderData = {
                line_items: token.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {
                    name: 'Primary', 
                    street: shippingData.address1, 
                    town_city: shippingData.city, 
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fullfillment: { shipping_method: shippingData.shippingOption},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(token.id, orderData)

            nextStep()

        }
    }

    return (
        <>
            <Review token={token}/>
            <Divider />
            <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            {/* Stripe */}
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e)=> handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br/> 
                            <Typography variant="body2">No Credit Card necessary for testing!</Typography>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color='primary'>
                                    Pay { token.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
