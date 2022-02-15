import React, {useState, useContext} from 'react';
import { Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SpeedIcon from '@mui/icons-material/Speed';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import { getProxySpeed } from '../http/proxyApi';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const CheckSpeed = observer(() => {
    const {proxy} = useContext(Context)
    const [loading, setLoading] = useState(false);

    const speedOnClick = (id) => {
        setLoading(true)
        getProxySpeed(id).then(data => {
            proxy.setSpeedProxy(data.data)
            console.log(data)
            setLoading(false)
        })
    }

    return(
        <>  
            <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                <SpeedIcon sx={{mr: 1, color: "#1776d2", fontSize: 70}}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Typography sx={{ fontSize: 18, textAlign: "center", color: "#1776d2" }} color="text.secondary" gutterBottom>
                    Proxy speed: {proxy.speedProxy}
                </Typography>
            </div>
            <LoadingButton
                sx={{mt: 1}}
                onClick={() => speedOnClick(proxy.selectProxy.id_proxy)}
                endIcon={<NetworkCheckIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                Check speed proxy
            </LoadingButton>
        </>
    )
});

export default CheckSpeed;