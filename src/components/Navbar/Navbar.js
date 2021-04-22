import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
//assets
import KeyboardSharpIcon from '@material-ui/icons/KeyboardSharp';
//styles
import useStyles from './styles'

const Navbar = ({quantity}) => {
    const styles = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position="fixed" className={styles.appBar} color="primary">
                <Toolbar>
                <KeyboardSharpIcon color="secondary" className={styles.keyboardIcon}/>
                    <Typography style={{ textDecoration: 'none', color: 'white' }} component={Link} to="/" variant="h6" className={styles.title}>
                          Key.io
                    </Typography>
                    <div className={styles.grow} />
                    {location.pathname === '/' && 
                        <div className={styles.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={quantity} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    }
                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar
