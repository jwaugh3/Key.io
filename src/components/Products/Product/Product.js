import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import Carousel from 'react-bootstrap/Carousel'
//style
import useStyles from './styles'

const Product = ({ product, onAddToCart, selectedItem, handleOpen }) => {
    const styles = useStyles()
    
    return (
        <Card className={styles.root} id={product.name} style={product.name === selectedItem ? { border: '4px solid #EB5E34'} : {backgroundColor: 'inherit'}}>
            <Carousel interval={null} fade={true} controls={false}>
                {product.assets.map((asset) => (
                    <Carousel.Item key={asset.url}>
                        <CardMedia className={styles.media} image={asset.url}/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <CardContent style={{height: '110px'}}>
                <div className={styles.cardContent}>
                    <Typography variant="h5" gutterBottom style={{fontWeight: 400}}>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" style={{fontWeight: 400, height: '70px'}}>
                        {product.price.formatted_with_symbol.split('.')[0]}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" style={{fontWeight: 400}} color="textSecondary" />
            </CardContent>

            <CardActions disableSpacing className={styles.cardActions}>
                <Button aria-label="Add to Cart" variant="outlined" type="button" onClick={()=>{
                    onAddToCart(product.name, product.id, 1)
                    handleOpen(product.name)
                    }} color='secondary'>
                    <Typography style={{marginRight: '8px'}} variant="subtitle1">Add to Cart</Typography>
                    <AddShoppingCart />
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product
