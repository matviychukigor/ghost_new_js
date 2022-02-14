import React, {useEffect, useState} from 'react';
import {CircularProgress, Box} from '@mui/material/';
import { getProxyWithDefault } from '../http/proxyApi';

const Shop = () => {
    const [loadin, setLoading] = useState(true)

    useEffect(() => {
        getProxyWithDefault().then(data => {
            console.log(data)
        }).finally(() => setLoading(false))
    }, [])

    if(loadin){
        return(
          <Box sx={{ 
            display: 'flex', 
            justifyContent: "center", 
            height: "100%", 
            alignItems: "center", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            position: "fixed" }}>
            <CircularProgress />
          </Box>
        )
    }

    return(
        <div>
            Shop
        </div>
    )
}

export default Shop;