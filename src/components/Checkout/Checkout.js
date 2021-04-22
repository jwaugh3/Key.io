import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'
import { commerce } from '../../lib/commerce'
import { Link, useHistory } from 'react-router-dom'
//styles
import useStyles from './styles'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCatpureCheckout, error}) => {
    //styles
    const styles = useStyles()
    //history
    const history = useHistory()
    //state
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setshippingData] = useState({})
    const [token, settoken] = useState(null)
    const [isFinished, setIsFinished] = useState(false)

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
                settoken(token)
            }
            catch (error){
                history.push('/')
            }
        }

        generateToken()
    }, [cart])

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const next = (data) => {
        setshippingData(data)

        nextStep()
    }

    const Form = () => (
        activeStep === 0 
            ? <AddressForm token={token} next={next}/>
            : <PaymentForm token={token} shippingData={shippingData} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCatpureCheckout} timeout={timeout}/>
    )

    const timeout = () => {
        setTimeout(()=>{
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname}.</Typography>
                <Divider className={styles.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>   
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase.</Typography>
                <Divider className={styles.divider}/>
            </div>   
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    ) : (
        <div className={styles.spinner}>
            <CircularProgress/>
        </div>
    )

    if(error) (
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    )

    return (
        <>
            <CssBaseline/>
            <div className={styles.toolbar}></div>  
            <main className={styles.layout}>
                <Paper className={styles.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={styles.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length ? <Confirmation/> : token && <Form/>}
                </Paper>                
            </main> 
        </>
    )
}

export default Checkout
