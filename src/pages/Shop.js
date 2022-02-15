import React, {useEffect, useState, useContext} from 'react';
import {CircularProgress, Box, Tab} from '@mui/material/';
import {TabContext, TabList, TabPanel } from '@mui/lab/';
import { getProxyWithDefault } from '../http/proxyApi';
import Residential from '../services/Residential';
import { Context } from '..';
import InfoBox from '../services/InfoBox';

const Shop = () => {
    const {proxy} = useContext(Context);

    const [loadin, setLoading] = useState(true)
    const [value, setValue] = useState("1")

    useEffect(() => {
        getProxyWithDefault().then(data => {
            proxy.setSelecteProxy(data.data[0])
            proxy.setSpeedProxy(data.data[0].speed)
            console.log(data.data)
            data.data.map(elem => {
                proxy.setProxyInfo(elem)
                return elem
            })
        }).finally(() => setLoading(false))
    }, [])

    const handlerChange = (event, newValue) => {
        setValue(newValue);
    }

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
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handlerChange} aria-label="lab API tabs example" centered>
                    <Tab label="Residential/Mobile proxy" value="1" />
                    <Tab label="Without authorization" value="2" />
                    <Tab label="Proxy on real device" value="3" />
                </TabList>
                </Box>
                <TabPanel style={{display: "flex", flexDirection:"row"}} value="1">
                    <Residential/>
                    <InfoBox/>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    )
}

export default Shop;