import React, {Component} from "react"
import Axios from "axios"
import ArCountries from './countries/countries.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { Confirmed, Active, Recovered, DeathRatio, Deaths } from './components/Stats'
import Disclaimer from "./components/Disclaimer";
import Cards from "./components/Cards";
import SearchCountries from "./components/SearchCountries"

export default class App extends Component{
    constructor(){
        super();
            this.state = {
                countryData: {updated:0,cases:0, todayCases:0, deaths:0, todayDeaths:0, recovered:0, active:0},
                Arabized: []
            }
        this.getCountryData = this.getCountryData.bind(this)
    }

    componentDidMount(){ this.getData(); this.setArabized() }

    /* Setting worldwide (default) state*/
     async getData(){
        const resApi = await Axios.get('https://corona.lmao.ninja/v2/all')
        this.setState({ countryData : resApi.data })
    }
    
    /*Arabizing country names*/
    async setArabized(){
        const resCountries = await Axios.get("https://corona.lmao.ninja/v2/countries?sort=deaths");
        const countries = [];
        const Arabized= [];

        /* Importing ISO2 country names */
        for(let k = 0; k < resCountries.data.length; k++){
            if (resCountries.data[k].countryInfo.iso2){
                countries.push(resCountries.data[k].countryInfo.iso2);
            }
        }

        /* Arabization of countries as options */
        for(let j=0; j<countries.length;j++){
            for(let i=0; i<ArCountries.arcountries.length;i++){
                if(ArCountries.arcountries[i].code === countries[j]){
                Arabized.push({value: countries[j], label: ArCountries.arcountries[i].name})
                }
            }
        }
        this.setState({ Arabized })
    }


    /* Setting state for chosen country*/
    async getCountryData(event){
        if (!event) return this.getData()
        const res = await Axios.get(`https://corona.lmao.ninja/v2/countries/${event.value}`)
        this.setState({ countryData : res.data })
    }


    /* Rendering main App*/
    render(){
        let deathRatio = 0
        deathRatio = this.state.countryData.deaths && (this.state.countryData.deaths / this.state.countryData.cases) * 100 ;
        return (
        <div className="container">
            <a href="https://github.com/ahmedzacky/covid-bel3araby" className="github"><FontAwesomeIcon icon={faGithub} /></a>
            <h1> اخر احصائيات فيروس الكورونا</h1>
            <SearchCountries countryData={this.state.countryData} Arabized={this.state.Arabized} getCountryData={this.getCountryData} />
            <div className='flex'>
                <Confirmed cases={this.state.countryData.cases} todayCases={this.state.countryData.todayCases} />
                <Active active={this.state.countryData.active} />
                <Recovered recovered={this.state.countryData.recovered} />
                <DeathRatio deathRatio={deathRatio} />
                <Deaths deaths={this.state.countryData.deaths} todayDeaths={this.state.countryData.todayDeaths} />
            </div>
            <Disclaimer updated={this.state.countryData.updated} /> 
            <Cards />     
        </div>
        )
    }
} 
