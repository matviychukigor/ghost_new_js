import {makeAutoObservable} from "mobx"

export default class ProxyStore {
    constructor(){
        this._proxyInfo = [];
        this._selectProxy = null;
        this._selectProxyInfo = null;
        this._infoLoading = true;
        this._speedProxy = null;
        this._sellProxy = null;
        this._modalOn = false;
        makeAutoObservable(this)
    }

    setInfoLoading(load) {
        this._infoLoading =load
    }

    setProxyInfo(proxy) {
        this._proxyInfo.push(proxy)
    }

    clearProxyInfo() {
        this._proxyInfo.clear()
    }

    setSelecteProxy(select) {
        this._selectProxy = select
    }

    setSelecteProxyInfo(info){
        this._selectProxyInfo = info
    }

    setSpeedProxy(speed){
        this._speedProxy = speed
    }

    setSellProxy(data) {
        this._sellProxy = data
    }

    setModalOn(bool) {
        this._modalOn = bool
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

    get speedProxy() {
        return this._speedProxy
    }

    get sellProxy() {
        return this._sellProxy
    }

    get modalOn() {
        return this._modalOn
    }

}