import {makeAutoObservable} from "mobx"

export default class ProxyWithoutStore {
    constructor(){
        this._premTabsCountry = [
            {code: "US", label: "United States"},
            {code: "GB", label: "United Kingdom"},
            {code: "CA", label: "Canada"},
            {code: 'CN', label: 'China'},
        ];
        this._selectTabsCountryPrem = "United States"
        this._proxyWithoutInfo = [];
        this._premLoading = true;
        this._selectProxyWithout = null;
        makeAutoObservable(this)
    }

    setPremLoading(load){
        this._premLoading = load
    }

    clearPremProxyInfo() {
        this._proxyWithoutInfo.clear()
    }

    resetTabsPremCountry(newCountry) {
        this._premTabsCountry.splice(4, 1, newCountry)
    }

    setProxyWithoutInfo(proxy) {
        this._proxyWithoutInfo.push(proxy)
    }

    setSelecteProxyWithout(select) {
        this._selectProxyWithout = select
    }

    setSelectTabsPremCountry(country) {
        this._selectTabsCountryPrem = country
    }

    get premLoading () {
        return this._premLoading
    }

    get premTabsCountry () {
        return this._premTabsCountry
    }

    get selectTabsPremCountry () {
        return this._selectTabsCountryPrem
    }

    get proxyWithoutInfo () {
        return this._proxyWithoutInfo
    }

    get selectProxyWithout() {
        return this._selectProxyWithout
    }

}