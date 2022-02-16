import React, {useState} from 'react';

import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel } from '@mui/lab/';
import CreatePaymet from "../components/Create payment"
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
            <TabPanel style={{display: "flex", flexDirection:"column", justifyContent: "center", padding: "0px"}} value="1">
                <CreatePaymet/>
            </TabPanel>
            <TabPanel style={{display: "flex", flexDirection:"column", justifyContent: "center"}} value="2">
                Tabs 2
            </TabPanel>
        </TabContext>
    )
}

export default Payments;