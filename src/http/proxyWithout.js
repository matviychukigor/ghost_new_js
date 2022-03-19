import {$proxy_host} from "./index";

export const getProxyPrem = async (country = "United States") => {
    const {data} = await $proxy_host.get(`/prem/search?c=${localStorage.getItem("token")}&country=${country}`)
    return data
}


