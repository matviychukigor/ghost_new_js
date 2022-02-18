import {makeAutoObservable} from "mobx"

export default class PaymentStore {
    constructor(){
        this._selectCardCountry = countriesCard[0]
        this._cardCountryStore = countriesCard
        this._selectQiwiCountry = coutriesQiwi[0]
        this._qiwiCountryStore = coutriesQiwi
        makeAutoObservable(this)
    }

    setSelectCardCountry(code) {
        this._selectCardCountry = code
    }
    
    setSelectQiwiCountry(code) {
        this._selectQiwiCountry = code
    }

    get selectCardQiwi () {
        return this._selectQiwiCountry
    }

    get selectCardCountry () {
        return this._selectCardCountry
    }

    get countryCardStore () {
        return this._cardCountryStore
    }

    get qiwiCountryStore () {
        return this._qiwiCountryStore
    }
}

const coutriesQiwi = [
    {code: "UA", merch_code: "UAH", label: "Qiwi UA", type: "qiwi"},
    {code: "RU", merch_code: "RUB", label: "Qiwi RU", type: "qiwi"},
    {code: "KZ", merch_code: "KZT", label: "Qiwi KZ", type: "qiwi"},
    {code: "EU", merch_code: "EUR", label: "Qiwi Euro", type: "qiwi"},
    {code: "US", merch_code: "USD", label: "Qiwi USD", type: "qiwi"},
];


const countriesCard = [
    { code: 'UA', label: 'Ukraine CARD', type: "card"},
    { code: 'RU', label: 'Russia CARD', type: "card" }
];
