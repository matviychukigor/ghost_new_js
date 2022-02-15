import React, {useContext, useEffect} from "react";
import { Card, Typography, CircularProgress, Box, Button } from "@mui/material";
import RouterIcon from '@mui/icons-material/Router';
import { getProxyInfo } from '../http/proxyApi';
import { observer } from 'mobx-react-lite';

import {Context} from "..";

const InfoBox = observer (() => {
    const {proxy} = useContext(Context)

    useEffect(() => {
        getProxyInfo(proxy.selectProxy.id_proxy).then(data => {
            proxy.setSelecteProxyInfo(data.data)
            console.log(data.data)
        }).finally(() => proxy.setInfoLoading(false))
    }, [proxy.selectProxy])

    return (
        <Card sx={{ minWidth: 475, ml: 2, p: 3 }}>
            {proxy.infoLoading ? 
            (<Box sx={{ display: 'flex', justifyContent: "center", height: "100%", alignItems: "center", top: 0, left: 0, right: 0, bottom: 0 }}>
                <CircularProgress />
            </Box> ): 
            (
            <>
                <div style={{display: "flex"}}>
                
                    <div style={{display: "flex", marginRight: 20}}>
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
                                {proxy.selecteProxyInfo.city}
                            </Typography>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.state}
                            </Typography>
                        </div>
                    </div> 

                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                ZIP code: 
                            </Typography> 
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Type proxy: 
                            </Typography> 
                        </div>
                        <div style={{display: "flex",flexDirection: "column"}}>
                            <Typography sx={{justifyContent: "center", fontSize: 20, color: "brown"}} variant="h6">
                                {proxy.selecteProxyInfo.zip}
                            </Typography>
                            <Typography sx={{justifyContent: "center", fontSize: 20}} variant="h6">
                                {proxy.selecteProxyInfo.type_proxy} <RouterIcon color="success"/>
                            </Typography>
                        </div>
                    </div>
                </div>
                <hr/>
                <Typography sx={{justifyContent: "center", fontSize: 20, mt: 2}} variant="h6">
                    Price:
                </Typography>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography sx={{ fontSize: 18, mt: 1 }} color="text.secondary" gutterBottom>
                            For 1 day:
                        </Typography> 
                        <Typography sx={{ fontSize: 18, mt: 1 }} color="text.secondary" gutterBottom>
                            For 3 day:
                        </Typography> 
                        <Typography sx={{ fontSize: 18, mt: 1 }} color="text.secondary" gutterBottom>
                            For 7 day:
                        </Typography> 
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Button sx={{width: 180}} variant="outlined" size="large">
                            {proxy.selecteProxyInfo.periods[0].price.toFixed(2) + "$"}
                        </Button>
                        <Button variant="outlined" size="large">
                            {proxy.selecteProxyInfo.periods[1].price.toFixed(2) + "$"}
                        </Button>
                        <Button variant="outlined" size="large">
                            {proxy.selecteProxyInfo.periods[2].price.toFixed(2) + "$"}
                        </Button>
                    </div>
                </div>
            </>
        ) }
        </Card>
    )
});

export default InfoBox;