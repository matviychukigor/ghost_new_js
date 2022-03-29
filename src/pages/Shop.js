import React, {useEffect, useState, useContext} from 'react';
import { Box, Tab} from '@mui/material/';
import {TabContext, TabList, TabPanel} from '@mui/lab/';
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {styled} from "@mui/system";
import TabUnstyled, {tabUnstyledClasses} from "@mui/base/TabUnstyled";
import {buttonUnstyledClasses} from "@mui/base/ButtonUnstyled";
/* import TabPanelUnstyled from "@mui/base/TabPanelUnstyled"; */
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import {Stack} from "@mui/material";

import {Context} from '..';
import { observer } from 'mobx-react-lite';

import {getProxyWithDefault} from '../http/proxyApi';
import {getProxyPrem} from "../http/proxyWithout";

import Residential from '../services/Residential';

import InfoBox from '../services/InfoBox';
import CountryComboBox from '../components/CountryComboBox';
import PremTabs from '../components/PremTabs';
import WithoutAuth from '../services/WithoutAuth';

import Loader from "../components/Loader";
import { CommentsDisabledOutlined } from '@mui/icons-material';


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

const Shop = observer( () => {
    const {proxy, withoutProxy} = useContext(Context);
    

    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState("1")
    const [country, setCountry] = useState("United States")

    useEffect(() => {
        setLoading(true)
        proxy.setInfoLoading(true)

        getProxyWithDefault(proxy.selectTabsCountry, proxy.getState).then(data => {
            if(data.status === 0){
                proxy.setSelecteProxy(data.data[0].proxy_id)
                proxy.clearProxyInfo()
                proxy.setSelecteProxy(data.data[0])
                proxy.setSpeedProxy(data.data[0].speed)
                data.data.map(elem => {
                    proxy.setProxyInfo(elem)
                    return elem
                })
            } else {
                proxy.clearProxyInfo()
                proxy.setProxyInfo("In this country proxy not found")
            }
        }).finally(() => setLoading(false))
    }, [proxy.selectTabsCountry, proxy.getState])

    const handlerChange = (event, newValue) => {
        setValue(newValue);
        if(newValue == 2) {
            getProxyPrem(withoutProxy.selectTabsCountry).then(data => {
                data.data.map(elem => {
                    withoutProxy.setProxyWithoutInfo(elem)
                    return elem
                })
            }).finally(() => withoutProxy.setPremLoading(false))
        }
    }

    const handleCountryChange = (e, country) => {
        proxy.setSelectTabsCountry(country)
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
                <TabPanel style={{display: "flex", flexDirection: "column", justifyContent: "space-around",  padding: 0}} value="1">
                    <Stack sx={{width: '100%', marginLeft: 2, marginTop: 1}}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                            <TabsUnstyled  value={proxy.selectTabsCountry} onChange={handleCountryChange}>
                                <CustomTabsList>
                                    {proxy.tabsCountry.map((elem) => {
                                        return(
                                            <CustomTab value={elem.label} key={elem.code} sx={{width: 140}}>
                                                <img
                                                    alt={elem.label}
                                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${elem.code}.svg`}
                                                    style={{height: 24, width: 20}}
                                                />    
                                                <span style={{marginLeft: 5}}>{elem.label}</span>
                                            </CustomTab>    
                                        )
                                    })}
                                </CustomTabsList>
                            </TabsUnstyled>
                            <CountryComboBox/>
                        </Box>
                        
                    </Stack>
                    <Box sx={{display: "flex"}}>
                        <InfoBox/>
                        {loading ? <Loader/> : <Residential/>}
                    </Box>
                    
                </TabPanel>
                <TabPanel value="2" sx={{padding: 2}}>
                    <PremTabs/>
                    {withoutProxy.premLoading ? <Loader/> : <WithoutAuth/>}
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    )
})

export default Shop;