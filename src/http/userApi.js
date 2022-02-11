import {$authHost, $hosts} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (nickname, email, password, password2) => {
    const response = await $hosts.post('users/register', {nickname, email, password, password2})
    return response
}

export const login = async (email, password) => {
    const {data} = await $hosts.post('auth', {email, password})
    localStorage.setItem("token", data.access_token)
    return jwt_decode(data.access_token)
}

export const getMe = async () => {
    const {data} = await $authHost.get("users/me")
    return data
}