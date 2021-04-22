import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart, Checkout, FeaturedProducts, Footer } from './components'
import { ThemeProvider } from '@material-ui/core'
import {theme} from './theme'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.css'

const App = () => {
    //state
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedItem, setSelectedItem] = useState('')
    const [categories, setCategories] = useState([])

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }

    const fetchCategories = async () => {
        const categories = await commerce.categories.list()
        let categoryNames = []
        categories.data.forEach((category)=>{
            categoryNames.push(category.name)
        })
        setCategories(categoryNames)
    }

    const handleAddToCart = async (productName, productID, quantity) => {
        const { cart } = await commerce.cart.add(productID, quantity)
        setCart(cart)
    }

    const handleUpdateCartQty = async (productID, quantity) => {
        const { cart } = await commerce.cart.update(productID, {quantity})
        setCart(cart)
    }

    const handleRemoveFromCart = async (productID) => {
        const { cart } = await commerce.cart.remove(productID)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const setSelection = (item) =>{
        setSelectedItem(item)
        setTimeout(()=>{
            setSelectedItem('')
        },3000)
    }

    const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        }
        catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(()=>{
        fetchProducts()
        fetchCart()

        fetchCategories()
    }, [])

    return (
        <Router>
            <div style={{position: 'relative',  paddingBottom: '190px'}}>
                <ThemeProvider theme={theme}>
                    <Navbar quantity={cart.total_items}/>
                </ThemeProvider>
                <Switch>
                    <Route exact path="/">
                        <ThemeProvider theme={theme}>
                            <FeaturedProducts products={products} setSelection={setSelection}/>
                            <Products products={products} onAddToCart={handleAddToCart} selectedItem={selectedItem} categories={categories}/>
                            <Footer />
                        </ThemeProvider>
                    </Route>
                    <Route exact path="/cart">
                        <ThemeProvider theme={theme}>
                            <Cart cart={cart} 
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                                handleEmptyCart={handleEmptyCart}
                            />
                            <Footer />
                        </ThemeProvider>
                    </Route>
                    <Route exact path="/checkout">
                        <ThemeProvider theme={theme}>
                            <Checkout 
                                cart={cart}
                                order={order}
                                onCaptureCheckout={handleCaptureCheckout}
                                error={errorMessage}
                            />
                            <Footer />
                        </ThemeProvider>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
