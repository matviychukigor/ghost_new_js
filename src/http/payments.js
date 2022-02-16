import { $authHost } from "./index"

export const getCryptoLinkPay = async (amount) => {
    const link = await $authHost.get(`merchant/create_crypto_pay?amount_fiat=${amount}`)
    return link
}

export const getCardLinkPay = async (amount) => {
    const link = await $authHost.get(`merchant/create_crypto_pay?amount_fiat=`)
}