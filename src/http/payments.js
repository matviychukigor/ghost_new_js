import { $authHost } from "./index"

export const getCryptoLinkPay = async (amount) => {
    const link = await $authHost.get(`merchant/create_crypto_pay?amount_fiat=${amount}`)
    return link
}

export const getCardLinkPay = async (amount, type) => {
    const link = await $authHost.get(`merchant/create_zver_pay?amount_fiat=${amount}&type=${type}`)
    return link
}

export const getQiwiLinkPay = async (amount, type) => {
    const link = await $authHost.get(`/merchant/create_freekassa_pay?amount_fiat=${amount}&type=${type}`)
    return link
}