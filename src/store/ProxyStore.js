import {makeAutoObservable} from "mobx"

export default class ProxyStore {
    constructor(){
        this._tabsCountry = [
            {code: "US", label: "United States"},
            {code: "CA", label: "Canada"},
            {code: 'CN', label: 'China'},
        ];
        this._selectTabsCountry = "United States"
        this._proxyInfo = [];
        this._state = "Alabama";
        this._selectProxy = null;
        this._selectProxyInfo = null;
        this._infoLoading = true;
        this._speedProxy = null;
        this._sellProxy = null;
        this._modalOn = false;
        makeAutoObservable(this)
    }

    resetTabsCountry(newCountry) {
        this._tabsCountry.splice(3, 1, newCountry)
    }

    setSelectTabsCountry(country) {
        this._selectTabsCountry = country
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

    setState(state) {
        this._state = state
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

    get tabsCountry () {
        return this._tabsCountry
    }

    get selectTabsCountry () {
        return this._selectTabsCountry
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

    get getState() {
        return this._state
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