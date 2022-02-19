import {$proxy_host, $authHostProxy} from "./index";

export const getProxyWithDefault = async (country, type_proxy = 0, same_dns = 0, no_bl = 0, zip_range = 50) => {
    const {data} = await $proxy_host.get(`site/search?country=${country}&type_proxy=${type_proxy}&same_dns=${same_dns}&no_bl=${no_bl}&zip_range=${zip_range}`)
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

export const getDNSCheck = async (id) => {
    const {data} = await $proxy_host.get(`site/check-dns?id=${id}`)
    return data
}

export const buyProxy = async (id, period) => {
    const {data} = await $authHostProxy.get(`site/buy?id=${id}&period=${period}`)
    return data
}
