import React, {useContext} from 'react'

import { Box } from '@mui/material/';
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {styled} from "@mui/system";
import TabUnstyled, {tabUnstyledClasses} from "@mui/base/TabUnstyled";
import {buttonUnstyledClasses} from "@mui/base/ButtonUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import PremAutoComplet from "../components/PremAutoComplete"

import {getProxyPrem} from "../http/proxyWithout";

import {Context} from '..';
import { observer } from 'mobx-react-lite';

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

const PremTabs = observer(() => {
    const {withoutProxy} = useContext(Context);

    const handleCountryChange = (e, country) => {
        withoutProxy.setSelectTabsPremCountry(country)
        withoutProxy.setPremLoading(true)
        withoutProxy.clearPremProxyInfo()
        getProxyPrem(withoutProxy.selectTabsPremCountry).then(data => {
            data.data.map(elem => {
                withoutProxy.setProxyWithoutInfo(elem)
                return elem
            })
        }).finally(() => withoutProxy.setPremLoading(false))
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <TabsUnstyled  value={withoutProxy.selectTabsPremCountry} onChange={handleCountryChange}>
                <CustomTabsList>
                    {withoutProxy.premTabsCountry.map((elem) => {
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
            <PremAutoComplet/>
        </Box>
    )
})

export default PremTabs;