import React from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

function Loader() {
    return <>
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "fixed"
        }}>
            <CircularProgress/>
        </Box>
    </>
}

export default Loader