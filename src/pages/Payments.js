import React, {useState} from 'react';

import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel } from '@mui/lab/';
import CryptoPayment from '../components/CryptoPayment';
import CardPayment from "../components/CardPayment";
import QiwiPayment from '../components/QiwiPayment';
/* import Typography from '@mui/material/Typography'; */
import Box from '@mui/material/Box';

const Payments = () => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <TabContext value={value}>
            <Box>
                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                    <Tab label="replenish the balance" value="1" />
                    <Tab label="replenishment history" value="2" />
                </TabList>
            </Box>
            <TabPanel style={{display: "flex", flexDirection:"row", justifyContent: "space-around", paddingTop: 0, paddingBottom: 0, paddingRight: "60px", paddingLeft: "60px"}} value="1">
                <CryptoPayment/>
                <CardPayment/>
                <QiwiPayment/>
            </TabPanel>
            <TabPanel style={{display: "flex", flexDirection:"column", justifyContent: "center"}} value="2">
                Tabs 2
            </TabPanel>
        </TabContext>
    )
}

export default Payments;