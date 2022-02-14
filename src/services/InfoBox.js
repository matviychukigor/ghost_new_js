import React, {useContext, useEffect} from "react";
import { Card, Typography } from "@mui/material";
import { getProxyInfo } from '../http/proxyApi';
import { observer } from 'mobx-react-lite';

import {Context} from "..";

const InfoBox = observer (() => {
    const {proxy} = useContext(Context)

    useEffect(() => {
        getProxyInfo(proxy.selectProxy.id_proxy).then(data => {
            proxy.setSelecteProxyInfo(data.data)
            console.log(data.data)
        })
    }, [proxy.selectProxy])

    return (
        <Card sx={{ minWidth: 475, ml: 2 }}>
            <Typography sx={{justifyContent: "center"}} variant="h4">
                {proxy.selecteProxyInfo.country}
            </Typography>
            <Typography sx={{justifyContent: "center"}} variant="h4">
                {proxy.selecteProxyInfo.state}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {proxy.selectProxy.id_proxy}
            </Typography>
        </Card>
    )
});

export default InfoBox;