import React from "react";
import { Card, Typography } from "@mui/material";

const InfoBox = () => {
    return (
        <Card sx={{ minWidth: 475, ml: 2 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
        </Card>
    )
}

export default InfoBox;