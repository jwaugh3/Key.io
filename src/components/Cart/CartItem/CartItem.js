import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
//styles
import useStyles from './styles'

const CartItem = ({item, handleUpdateCartQty, handleRemoveFromCart}) => {
    const styles = useStyles()

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={styles.media}/>
            <CardContent className={styles.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h4">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
                <div className={styles.buttons}>
                    <Button type="button" size="small" onClick={()=>{ handleUpdateCartQty(item.id, item.quantity - 1) }}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=>{ handleUpdateCartQty(item.id, item.quantity + 1) }}>+</Button>
                </div>
                <Button vairant="contained" type="button"  color="secondary" onClick={()=>{ handleRemoveFromCart(item.id)}}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
