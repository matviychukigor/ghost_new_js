import React, {useContext, useEffect, useState} from "react";
import { Card, Typography, CircularProgress, Box, Tab, } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {TabContext, TabList, TabPanel } from '@mui/lab/';
import RouterIcon from '@mui/icons-material/Router';
import { getProxyInfo, buyProxy } from '../http/proxyApi';
import { observer } from 'mobx-react-lite';

import CheckSpeed from "./CheckSpeed";
import CheckDns from "./CheckDns";
import SellModal from "../components/SellModal"

import {Context} from "..";

const InfoBox = observer (() => {
    const {proxy} = useContext(Context)
    const [value, setValue] = useState("1")
    const [loadingPrice, setLoadingPrice] = useState(false)

    useEffect(() => {
        if(proxy.selectProxy !== null){
            getProxyInfo(proxy.selectProxy.id_proxy).then(data => {
                proxy.setSelecteProxyInfo(data.data)
                console.log(data.data)
            }).finally(() => proxy.setInfoLoading(false))
        }
    }, [proxy.selectProxy])

    const handlerChange = (event, newValue) => {
        setValue(newValue);
    }

    const buyProxys = (id, period) => {
        setLoadingPrice(true)
        proxy.setModalOn(true)
        /* buyProxy(id, period).then(data => {
            setLoadingPrice(false)
            console.log(data)
            proxy.setSellProxy(data)
        }) */
    }

    return (
        <Card sx={{ minWidth: 400, height: 520, ml: 2, p: 3 }}>
            {proxy.infoLoading ? 
            (<Box sx={{ display: 'flex', justifyContent: "center", height: "100%", alignItems: "center", top: 0, left: 0, right: 0, bottom: 0 }}>
                <CircularProgress />
            </Box> ): 
            (
            <>
                <div style={{display: "flex"}}>
                
                    <div style={{display: "flex", marginRight: 10}}>
                        <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Country: 
                            </Typography> 
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                City: 
                            </Typography> 
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                State: 
                            </Typography> 
                        </div>
                        <div style={{display: "flex",flexDirection: "column"}}>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.country}
                            </Typography>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.city  === "" ? "---" : proxy.selecteProxyInfo.city}
                            </Typography>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.state === "" ? "---" : proxy.selecteProxyInfo.state}
                            </Typography>
                        </div>
                    </div> 

                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                ZIP: 
                            </Typography> 
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Type: 
                            </Typography> 
                        </div>
                        <div style={{display: "flex",flexDirection: "column"}}>
                            <Typography sx={{justifyContent: "center", fontSize: 20, color: "brown"}} variant="h6">
                                {proxy.selecteProxyInfo.zip === "" ? "---" : proxy.selecteProxyInfo.zip}
                            </Typography>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.type_proxy} 
                            </Typography>
                            <RouterIcon color="success"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <Typography sx={{justifyContent: "center", fontSize: 20, mt: 2}} variant="h6">
                    Price:
                </Typography>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography sx={{ fontSize: 18, mt: 1, color: "green", fontWeight: 500 }}  gutterBottom>
                            For 1 day:
                        </Typography> 
                        <Typography sx={{ fontSize: 18, mt: 1, color: "green", fontWeight: 500 }}  gutterBottom>
                            For 3 day:
                        </Typography> 
                        <Typography sx={{ fontSize: 18, mt: 1, color: "green", fontWeight: 500 }}  gutterBottom>
                            For 7 day:
                        </Typography> 
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <SellModal/>
                        <LoadingButton 
                            sx={{width: 180}} 
                            variant="outlined" 
                            size="large"
                            loading={loadingPrice}
                            onClick={() => buyProxys(proxy.selectProxy.id_proxy, "1")}
                        >
                            {proxy.selecteProxyInfo.periods[0].price.toFixed(2) + "$"}
                        </LoadingButton>
                        <LoadingButton 
                            variant="outlined" 
                            size="large"
                            loading={loadingPrice}
                            onClick={() => buyProxys(proxy.selectProxy.id_proxy, "3")}
                        >
                            {proxy.selecteProxyInfo.periods[1].price.toFixed(2) + "$"}
                        </LoadingButton>
                        <LoadingButton 
                            variant="outlined" 
                            size="large"
                            loading={loadingPrice}
                            onClick={() => buyProxys(proxy.selectProxy.id_proxy, "7")}
                        >
                            {proxy.selecteProxyInfo.periods[2].price.toFixed(2) + "$"}
                        </LoadingButton>
                    </div>
                </div>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handlerChange} aria-label="lab API tabs example" centered>
                            <Tab label="Proxy speed" value="1" />
                            <Tab label="Check DNS" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel style={{display: "flex", flexDirection:"column", justifyContent: "center", padding: "0px"}} value="1">
                        <CheckSpeed/>
                    </TabPanel>
                    <TabPanel style={{display: "flex", flexDirection:"column", justifyContent: "center"}} value="2">
                        <CheckDns/>
                    </TabPanel>
                </TabContext>
            </>
        ) }
        </Card>
    )
});

export default InfoBox;