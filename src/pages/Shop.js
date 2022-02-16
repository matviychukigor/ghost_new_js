import React, {useEffect, useState, useContext} from 'react';
import { Box, Tab} from '@mui/material/';
import {TabContext, TabList, TabPanel} from '@mui/lab/';
import {getProxyWithDefault} from '../http/proxyApi';
import Residential from '../services/Residential';
import {Context} from '..';
import InfoBox from '../services/InfoBox';
import Flags from "country-flag-icons/react/3x2";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {styled} from "@mui/system";
import TabUnstyled, {tabUnstyledClasses} from "@mui/base/TabUnstyled";
import {buttonUnstyledClasses} from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import {Stack} from "@mui/material";
import Loader from "../components/Loader";


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const CustomTab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;


  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 8px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomTabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const CustomTabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Shop = () => {
    const {proxy} = useContext(Context);

    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState("1")
    const [country, setCountry] = useState("United States")

    useEffect(() => {
        setLoading(true)
        proxy.setInfoLoading(true)

        getProxyWithDefault(country).then(data => {
            proxy.setSelecteProxy(data.data[0].proxy_id)
            proxy.clearProxyInfo()

            proxy.setSelecteProxy(data.data[0])
            proxy.setSpeedProxy(data.data[0].speed)
            console.log(data.data)
            data.data.map(elem => {
                proxy.setProxyInfo(elem)
                return elem
            })
        }).finally(() => setLoading(false))
    }, [country])

    const handlerChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleCountryChange = (e, country) => {
        setCountry(country)
    }

    return (
        <Box sx={{height: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handlerChange} aria-label="lab API tabs example" centered>
                        <Tab label="Residential/Mobile proxy" value="1"/>
                        <Tab label="Without authorization" value="2"/>
                        <Tab label="Proxy on real device" value="3"/>
                    </TabList>
                </Box>
                <TabPanel style={{display: "flex", flexDirection: "row"}} value="1">
                    <Stack sx={{width: '100%'}}>
                        <TabsUnstyled defaultValue={country} onChange={handleCountryChange}>
                            <CustomTabsList>
                                <CustomTab value='United States'>
                                    <Flags.US title="United States" style={{height: 24, width: 24}}/>
                                    <span style={{marginLeft: 10}}>United States</span>
                                </CustomTab>
                                <CustomTab value='United Kingdom'>
                                    <Flags.GB title="United Kingdom" style={{height: 24, width: 24}}/>
                                    <span style={{marginLeft: 10}}>United Kingdom</span>
                                </CustomTab>
                                <CustomTab value='Canada'>
                                    <Flags.CA title="Canada" style={{height: 24, width: 24}}/>
                                    <span style={{marginLeft: 10}}>Canada</span>
                                </CustomTab>
                                <CustomTab value='Italy'>
                                    <Flags.IT title="Italy" style={{height: 24, width: 24}}/>
                                    <span style={{marginLeft: 10}}>Italy</span>
                                </CustomTab>
                                <CustomTab value='China'>
                                    <Flags.CN title="China" style={{height: 24, width: 24}}/>
                                    <span style={{marginLeft: 10}}>China</span>
                                </CustomTab>
                            </CustomTabsList>
                        </TabsUnstyled>
                        {loading === true ? <Loader/> : <Residential/>}
                    </Stack>
                    <InfoBox/>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    )
}

export default Shop;