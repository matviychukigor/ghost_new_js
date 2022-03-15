import {makeAutoObservable} from "mobx"

export default class ProxyWithoutStore {
    constructor(){
        this._proxyWithoutInfo = [];
        this._selectProxyWithout = null;
        makeAutoObservable(this)
    }

    setProxyWithoutInfo(proxy) {
        this._proxyWithoutInfo.push(proxy)
    }

    setSelecteProxyWithout(select) {
        this._selectProxyWithout = select
    }

    get proxyWithoutInfo () {
        return this._proxyWithoutInfo
    }

    get selectProxyWithout() {
        return this._selectProxyWithout
    }

}