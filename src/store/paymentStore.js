import {makeAutoObservable} from "mobx"

export default class PaymentStore {
    constructor(){
        this._selectCardCountry = countriesCard[0];
        this._cardCountryStore = countriesCard
        makeAutoObservable(this)
    }

    setSelectCardCountry(code) {
        this._selectCardCountry = code
    }

    get selectCardCountry () {
        return this._selectCardCountry
    }

    get countryCardStore () {
        return this._cardCountryStore
    }
}


const countriesCard = [
    { code: 'UA', label: 'Ukraine CARD', type: "card"},
    { code: 'RU', label: 'Russia CARD', type: "card" }
]
