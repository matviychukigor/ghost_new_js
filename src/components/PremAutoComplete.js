import React, {useState, useContext} from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {getProxyPrem} from "../http/proxyWithout";

import {Context} from '..';
import { observer } from 'mobx-react-lite';

const PremAutoComplet = observer(() => {
    const {withoutProxy} = useContext(Context)
    const [inputValues, setInputValue] = useState(premCountry[0])

    return(
        <Autocomplete
            id="country-select-demo"
            sx={{ margin: 1, width: "20%"}}
            options={premCountry}
            value={inputValues}
            onChange={(event,  newInputValue) => {
                setInputValue(newInputValue);
                if(newInputValue.label !== "Choose country"){
                    console.log(newInputValue)
                    withoutProxy.resetTabsPremCountry(newInputValue)
                    withoutProxy.setSelectTabsPremCountry(newInputValue.label)
                    withoutProxy.setPremLoading(true)
                    withoutProxy.clearPremProxyInfo()
                    getProxyPrem(withoutProxy.selectTabsPremCountry).then(data => {
                        data.data.map(elem => {
                            withoutProxy.setProxyWithoutInfo(elem)
                            return elem
                        })
                    }).finally(() => withoutProxy.setPremLoading(false))
                } 
            }}
            disableClearable
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.label === "Choose country" ? "" : 
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                    }
                    
                    {option.label}
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Choose a country" />}
        />
    )
})

export default PremAutoComplet;

const premCountry = [
    { code: '', label: "Choose country"},
    { code: 'AE',label: 'United Arab Emirates', cc: "Asia" },
    { code: 'AR', label: 'Argentina', cc: 'South America'},
    { code: 'AT', label: 'Austria', cc: "Europe" },
    { code: 'AU', label: 'Australia', suggested: true, cc: "Australia"},
    { code: 'BA', label: 'Bosnia and Herzegovina', cc: "Europe"},
    { code: 'BE', label: 'Belgium', cc: "Europe" },
    { code: 'BG', label: 'Bulgaria', cc: "Europe" },
    { code: 'BO', label: 'Bolivia', cc: 'South America'},
    { code: 'BR', label: 'Brazil', cc: 'South America'},
    { code: 'BS', label: 'Bahamas', cc: 'North America'},
    { code: 'CH', label: 'Switzerland', cc: "Europe" },
    { code: 'CL', label: 'Chile', cc: 'South America'},
    { code: 'CO', label: 'Colombia', cc: "South America"},
    { code: 'VE', label: 'Venezuela', cc: "South America"},
    { code: 'CR', label: 'Costa Rica', cc: 'North America'},
    { code: 'CZ', label: 'Czechia', cc: "Europe" },
    { code: 'DE', label: 'Germany', suggested: true, cc: "Europe"},
    { code: 'DK', label: 'Denmark', cc: "Europe" },
    { code: 'DO', label: 'Dominican Republic', cc: "North America"},
    { code: 'DZ', label: 'Algeria', cc: "Africa"},
    { code: 'EC', label: 'Ecuador', cc: 'South America'},
    { code: 'EG', label: 'Egypt', cc: "Africa" },
    { code: 'ES', label: 'Spain', cc: "Europe" },
    { code: 'FI', label: 'Finland', cc: "Europe"},
    { code: 'FR', label: 'France', suggested: true, cc: "Europe"},
    { code: 'GH', label: 'Ghana', cc: "Africa" },
    { code: 'GL', label: 'Greenland', cc: "North America", },
    { code: 'CA', label: "Canada", cc: "North America" },
    { code: 'GR', label: 'Greece', cc: "Europe"},
    { code: 'HN', label: 'Honduras', cc: 'North America'},
    { code: 'HR', label: 'Croatia', cc: "Europe" },
    { code: 'HU', label: 'Hungary', cc: "Europe"},
    { code: 'IE', label: 'Ireland', cc: "Europe" },
    { code: 'IL', label: 'Israel', cc: "Asia" },
    { code: 'IN', label: 'India', cc: "Asia"},
    { code: 'IS', label: 'Iceland', cc: "Europe"},
    { code: 'IT', label: 'Italy', cc: "Europe" },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', cc:  'North America'},
    { code: 'JO', label: 'Jordan', phone: '962' },
    { code: 'JP', label: 'Japan', suggested: true, cc: "Asia" },
    { code: 'KE', label: 'Kenya', cc: "Africa"},
    { code: 'KR', label: 'Republic of Korea', cc: "Asia"},
    { code: 'KW', label: 'Kuwait', cc: "Asia" },
    { code: 'LT', label: 'Republic of Lithuania', cc: "Europe" },
    { code: 'MA', label: 'Morocco', cc: "Africa" },
    { code: 'MX', label: 'Mexico', cc: 'North America'},
    { code: 'MY', label: 'Malaysia', cc: "Asia" },
    { code: 'NL', label: 'Netherlands', cc: "Europe"},
    { code: 'NO', label: 'Norway', cc: "Europe"},
    { code: 'NZ', label: 'New Zealand', cc: "Australia"},
    { code: 'OM', label: 'Oman', cc: "Asia" },
    { code: 'PA', label: 'Panama', cc: "North America"},
    { code: 'PE', label: 'Peru', cc: 'South America'},
    { code: 'PH', label: 'Philippines', cc: "Asia" },
    { code: 'PK', label: 'Pakistan', cc: "Asia"},
    { code: 'PL', label: 'Poland', cc: "Europe"},
    { code: 'PT', label: 'Portugal', cc: "Europe" },
    { code: 'QA', label: 'Qatar', cc: "Asia"},
    { code: 'RO', label: 'Romania', cc: "Europe"},
    { code: 'RS', label: 'Serbia', cc: "Europe"},
    { code: 'SA', label: 'Saudi Arabia', cc: "Asia"},
    { code: 'SE', label: 'Sweden', cc: "Europe"},
    { code: 'SI', label: 'Slovenia', cc: "Europe" },
    { code: 'SK', label: 'Slovak Republic', cc: "Europe" },
    { code: 'SN', label: 'Senegal', cc: "Africa"},
    { code: 'SR', label: 'Suriname', cc: 'South America'},
    { code: 'TH', label: 'Thailand', cc: "Asia" },
    { code: 'TN', label: 'Tunisia', cc: 'Africa'},
    { code: 'TR', label: 'Turkey', cc: "Asia" },
    { code: 'TW', label: 'Taiwan', cc: "Asia" },
    { code: 'UY', label: 'Uruguay', cc: 'South America'},
    { code: 'VN', label: 'Vietnam', cc: "Asia" },
    { code: 'ZA', label: 'South Africa', cc: "Africa" },
    { code: 'RU', label: 'Russia', cc: "Europe" },
    { code: 'UA', label: 'Ukraine', cc: "Europe" },
]


const state = [
    {code: "AL", label: "Alabama"},
    {code: "АК", label: "Alaska"},
    {code: "AZ", label: "Arizona"},
    {code: "AR", label: "Arkansas"},
    {code: "CA", label: "California"},
    {code: "CO", label: "Colorado"},
    {code: "CT", label: "Connecticut"},
    {code: "DE", label: "Delaware"},
    {code: "DC", label: "District of Columbia"},
    {code: "FL", label: "Florida"},
    {code: "GA", label: "Georgia"},
    {code: "HI", label: "Hawaii"},
    {code: "ID", label: "Idaho"},
    {code: "IL", label: "Illinois"},
    {code: "IN", label: "Indiana"},
    {code: "IA", label: "Iowa"},
    {code: "KS", label: "Kansas"},
    {code: "KY", label: "Kentucky"},
    {code: "LA", label: "Louisiana"},
    {code: "ME", label: "Maine"},
    {code: "MD", label: "Maryland"},
    {code: "МА", label: "Massachusetts"},
    {code: "MI", label: "Michigan"},
    {code: "MN", label: "Minnesota"},
    {code: "MS", label: "Mississippi"},
    {code: "МО", label: "Missouri"},
    {code: "MT", label: "Montana"},
    {code: "NE", label: "Nebraska"},
    {code: "NV", label: "Nevada"},
    {code: "NH", label: "New Hampshire"},
    {code: "NJ", label: "New Jersey"},
    {code: "NM", label: "New Mexico"},
    {code: "NY", label: "New York"},
    {code: "NC", label: "North Carolina"},
    {code: "ND", label: "North Dakota"},
    {code: "ОН", label: "Ohio"},
    {code: "ОК", label: "Oklahoma"},
    {code: "OR", label: "Oregon"},
    {code: "РА", label: "Pennsylvania"},
    {code: "RI", label: "Rhode Island"},
    {code: "SC", label: "South Carolina"},
    {code: "SD", label: "South Dakota"},
    {code: "TN", label: "Tennessee"},
    {code: "ТХ", label: "Texas"},
    {code: "UT", label: "Utah"},
    {code: "VT", label: "Vermont"},
    {code: "VA", label: "Virginia"},
    {code: "WA", label: "Washington"},
    {code: "WV", label: "West Virginia"},
    {code: "WI", label: "Wisconsin"},
    {code: "WY", label: "Wyoming"},
]
  