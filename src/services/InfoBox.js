import React, {useContext} from "react";
import { Card, Typography } from "@mui/material";
import { observer } from 'mobx-react-lite';

import {Context} from "..";

const InfoBox = observer (() => {
    const {proxy} = useContext(Context)
    return (
        <Card sx={{ minWidth: 475, ml: 2 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {proxy.selectProxy.id_proxy}
            </Typography>
        </Card>
    )
});

export default InfoBox;