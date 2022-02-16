import React, {useContext, useState, useRef} from "react";
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from "@mui/material";
import { getDNSCheck } from '../http/proxyApi';
import LoadingButton from '@mui/lab/LoadingButton';



import { Context } from '..';
import { observer } from 'mobx-react-lite';
const CheckDns = observer(() => {
    const {proxy} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [dnsChecking, setDnsChecking] = useState("null")
    const componentMounted = useRef(true)

    const dnsOnClick = (id) => {
        setLoading(true)
        getDNSCheck(id)
        .then(data => {
            if(componentMounted.current){
                setDnsChecking(data.data)
                console.log(data.data)
                setLoading(false)
            }
            return () => {componentMounted.current = false}
        })
    }

    return(
        <>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <StorageIcon color="success" sx={{mr: 1}}/>
                <Typography sx={{ fontSize: 18, textAlign: "center", fontWeight: 700, color: "#2e7d32" }} color="success" gutterBottom>
                    {dnsChecking === "null" ? "Succesfuly DNS server checked" : "DNS server have some problem"}
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                {dnsChecking === "null" ? 
                    <CheckCircleOutlineIcon color="success" sx={{fontSize: 60}}/> :
                    <ErrorIcon sx={{fontSize: 60,  color: "red"}}/>
                }
                
            </div>
            <LoadingButton
                sx={{mt: 1}}
                onClick={() => dnsOnClick(proxy.selectProxy.id_proxy)}
                endIcon={<FactCheckIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                Check DNS server
            </LoadingButton>
        </>
    )
});

export default CheckDns;