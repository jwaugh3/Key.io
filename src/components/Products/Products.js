import React, { useState } from 'react'
import { Grid, Checkbox, Paper, Snackbar } from '@material-ui/core'
import Product from './Product/Product'
//styles
import useStyles from './styles'

const Products = ({ products, onAddToCart, selectedItem, categories }) => {
    const styles = useStyles()
    const [show, setShow] = useState([])
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
        lastAdded: ''
      });

    const handleCheck = (event, category) => {
        if(event.target.checked){
            setShow([...show, category])
        } else {
            let newArray = [...show]
            let index = newArray.findIndex((x)=>x === category)
            newArray.splice(index, 1)
            setShow(newArray)
        }
    }
    
      const { vertical, horizontal, open, lastAdded } = state;
    
      const handleOpen = (item) => {
        setState({ ...state, open: true, lastAdded: item });
      }

      const handleClose = () => {
        setState({ ...state, open: false });
      };


    return (
        <main className={styles.content} id="store">
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message={'Added ' + lastAdded + ' to cart'}
                key={lastAdded}
            />
            <Paper className={styles.filterContainer}>
                <b>Filter:</b> 
                {categories.map((category) => (
                    <div key={category} className={styles.checkboxContainer} style={{display: 'inline-block'}}>
                        <label style={{display: 'inline-block'}}>{category}</label>
                        <Checkbox
                            defaultChecked={false}
                            color="primary"
                            onChange={(event)=>handleCheck(event, category)}
                        />
                    </div>
                ))}   
            </Paper>
            <div className={styles.toolbar}/>
            <Grid mx={0} width='100%' container justify="center" spacing={4}>
                
                <Grid mx={0} px={0} container justify="center" spacing={4}>
                {products.map((product)=> {
                    
                    if(show.length === 0){
                        return (
                            <Grid mx={0} className={styles.productGrid} item key={product.id} xs={12} sm={6} md={4}>
                                <Product product={product} onAddToCart={onAddToCart} selectedItem={selectedItem} handleOpen={handleOpen}/>
                            </Grid>
                        )
                    }
                    let categoryShow = product.categories.filter((x) => show.includes(x.name))
                    if(categoryShow.length > 0) {
                        return (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
                                <Product product={product} onAddToCart={onAddToCart} selectedItem={selectedItem}  handleOpen={handleOpen}/>
                            </Grid>
                        )
                    }
                    else return (<></>)
                }
                )}
                </Grid>
            </Grid>
        </main>
    )
}

export default Products