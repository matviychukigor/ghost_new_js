import {makeAutoObservable} from "mobx"

export default class ProxyStore {
    constructor(){
        this._proxyInfo = [], 
        this._selectProxy = {}
        makeAutoObservable(this)
    }

    setProxyInfo(proxy) {
        this._proxyInfo.push(proxy)
    }

    setSelecteProxy(select) {
        this._selectProxy = select
    }

    get proxyInfo () {
        return this._proxyInfo
    }

    get selectProxy() {
        return this._selectProxy
    }
}