import {$proxy_host, $authHostProxy} from "./index";

export const getProxyWithDefault = async (country, type_proxy = 0, same_dns = 0, no_bl = 0, zip_range = 50) => {
    const {data} = await $proxy_host.get(`/face/search?c=${localStorage.getItem("token")}&country=${country}&type_proxy=${type_proxy}&same_dns=${same_dns}&no_bl=${no_bl}`)
    return data
}

export const getProxyInfo = async (id) => {
    const {data} = await $proxy_host.get(`/face/get_info_proxy?c=${localStorage.getItem("token")}&proxy=${id}`)
    return data
}

export const getDNSCheck = async (id) => {
    const {data} = await $proxy_host.get(`/face/check_dns?id=${id}&c=${localStorage.getItem("token")}`)
    return data
}

export const getProxySpeed= async (id) => {
    const {data} = await $proxy_host.get(`/face/check-speed?id=${id}&c=${localStorage.getItem("token")}`)
    return data
}

export const buyProxy = async (id, period) => {
    const {data} = await $authHostProxy.get(`site/buy?id=${id}&period=${period}`)
    return data
}
