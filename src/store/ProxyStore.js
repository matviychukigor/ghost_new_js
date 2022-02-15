import {makeAutoObservable} from "mobx"

export default class ProxyStore {
    constructor(){
        this._proxyInfo = [];
        this._selectProxy = null;
        this._selectProxyInfo = null;
        this._infoLoading = true;
        makeAutoObservable(this)
    }

    setInfoLoading(load) {
        this._infoLoading =load
    }

    setProxyInfo(proxy) {
        this._proxyInfo.push(proxy)
    }

    setSelecteProxy(select) {
        this._selectProxy = select
    }

    setSelecteProxyInfo(info){
        this._selectProxyInfo = info
    }

    get proxyInfo () {
        return this._proxyInfo
    }

    get selectProxy() {
        return this._selectProxy
    }

    get selecteProxyInfo() {
        return this._selectProxyInfo
    }

    get infoLoading(){
        return this._infoLoading
    }
}