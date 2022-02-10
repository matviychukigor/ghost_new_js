import React from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Typography} from '@mui/material';

import { NavLink } from 'react-router-dom';

import {LOGIN} from "../utils/const";

const SuccesRegistration = () => {
    return(
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <CheckCircleIcon color="success" sx={{fontSize: 150, color: "grey", textAlign: "center"}}/>
            </div>
            <Typography sx={{ fontSize: 30, textAlign: "center" }} color="text.secondary" gutterBottom>
                Your registration succes
            </Typography>
            <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                <NavLink style={{color: "#1776d2", textAlign: "center",  textDecoration: "none", fontSize: "30px", fontFamily: "sans-serif", fontWeight: 700}} to={LOGIN}> Login</NavLink>
            </div>
        </div>
    )
}

export default SuccesRegistration;