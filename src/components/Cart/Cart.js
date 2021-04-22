import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
//styles
import useStyles from './styles'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const styles = useStyles()
    const isEmpty = !cart?.line_items?.length

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart. Start adding them <Link to="/" className={styles.link}><u>here</u>.</Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={styles.cardDetails}>
                <Typography variant="h5">Subtotal: { cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={styles.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={styles.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    return (
        <Container height="100%">
            <div className={styles.toolbar}/>
            <Typography className={styles.title} variant="h4" gutterBottom mt={'15px'}>Your Shopping Cart</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
