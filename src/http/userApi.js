import {$authHost, $hosts} from "./index";

export const registration = async (nickname, email, password, password2) => {
    const response = await $hosts.post('users/register', {nickname, email, password, password2})
    return response
}

export const login = async (email, password) => {
    const response = await $hosts.post('auth', {email, password})
    return response
}