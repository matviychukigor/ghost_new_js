import {$proxy_host} from "./index";

export const getProxyWithDefault = async (country = "United", type_proxy = 0, same_dns = 0, no_bl = 0, zip_range = 50) => {
    const {data} = await $proxy_host.get(`site/search?country=${country}%20States&type_proxy=${type_proxy}&same_dns=${same_dns}&no_bl=${no_bl}&zip_range=${zip_range}`)
    return data
}

export const getProxyInfo = async (id) => {
    const {data} = await $proxy_host.get(`site/get_info_proxy/${id}`)
    return data
}

export const getProxySpeed = async (id) => {
    const {data} = await $proxy_host.get(`site/check-speed?id=${id}`)
    return data
}
