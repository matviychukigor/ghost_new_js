import {makeAutoObservable} from "mobx"

export default class ProxyStore {
    constructor(){
        this._proxyInfo = []
        makeAutoObservable(this)
    }

    setProxyInfo(proxy) {
        this._proxyInfo.push(proxy)
    }

    get proxyInfo () {
        return this._proxyInfo
    }
}