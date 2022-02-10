import axios from "axios";

const $hosts = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export{
    $hosts, 
    $authHost
}