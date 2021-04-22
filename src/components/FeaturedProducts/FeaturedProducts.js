import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
//style
import useStyles from './styles'
//assets
import landing from '../../resources/landing.png'

const featuredList = [
    'A-list', 'Sandstone', 'Rainy Day', 'Blank Slate', 'Cafe Keys'
]

const FeaturedProducts = ({products, setSelection}) => {
  const styles = useStyles()
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(()=>{
    if(featuredItems.length === 0){
        for(let x=0; x < products.length; x++){
            if(featuredList.includes(products[x].name)) setFeaturedItems(currentItems => [...currentItems, products[x]])
        }
    }

  }, [products])

  return (
    <div className={styles.root}>
        {featuredItems.length > 0 ?
       
            <div className={styles.subContainer1}>
                    <div className={styles.welcome}>
                        <Typography color="inherit" className={styles.text} style={{ fontSize: '4vh', marginBottom: '0', padding: '10px'}}>
                            Welcome to Key.io
                        </Typography>
                    </div>
                    <div className={styles.subWelcome}>
                        <Typography color="inherit" className={styles.text} style={{ fontSize: '4vh', marginBottom: '0', padding: '10px'}}>
                            your keyboard destination
                        </Typography>
                    </div>
                    <img src={landing} className={styles.image}/>
            </div>


      :null
        }
    </div>
  );
}

export default FeaturedProducts