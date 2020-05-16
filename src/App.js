import React, { useState, useEffect } from "react"
import Axios from "axios"
import ArCountries from './countries/countries.json'
import { Confirmed, Active, Recovered, DeathRatio, Deaths } from './components/Stats'
import Disclaimer from "./components/Disclaimer";
import Cards from "./components/Cards";
import SearchCountries from "./components/SearchCountries"
import Header from "./components/Theme/Header";

const App = () => {
    const [countryData, setcountryData] = useState({updated:0,cases:0, todayCases:0, deaths:0, todayDeaths:0, recovered:0, active:0});
    const [Arabized, setArabized] = useState([]);

    const getGlobalData = async () => {
        const resApi = await Axios.get('https://corona.lmao.ninja/v2/all');
        setcountryData(resApi.data);
    };

    const fetchAndArabize = async() =>{
        const response = await Axios.get("https://corona.lmao.ninja/v2/countries?sort=deaths");
        const countries= [];
        const Arabized= [];
    
        /* Importing ISO2 country names */
        for(let k = 0; k < response.data.length; k++){
            if (response.data[k].countryInfo.iso2){
                countries.push(response.data[k].countryInfo.iso2);
            }
        }
    
        /* Arabization of countries as options */
        for(let j=0; j<countries.length;j++){
            for(let i=0; i<ArCountries.arcountries.length; i++){
                if(ArCountries.arcountries[i].code === countries[j]){
                Arabized.push({value: countries[j], label: ArCountries.arcountries[i].name})
                }
            }
        }
        setArabized(Arabized)
    }; 
    

    const initialEffect = () => { 
        getGlobalData();
        fetchAndArabize(); 
    }

    useEffect(() => initialEffect() , [])

    
    const getCountryData = async (event) => {
        if(event){
        const res = await Axios.get(`https://corona.lmao.ninja/v2/countries/${event.value}`)
        setcountryData(res.data)
        } else {
        getGlobalData()
        }
    }

    let deathRatio = 0
    deathRatio = countryData.deaths && (countryData.deaths / countryData.cases) * 100 ;

    return (
        <body>
            <div className="container">
                <Header/>
                <SearchCountries countryData={countryData} Arabized={Arabized} getCountryData={getCountryData}/>
                <div className='flex'>
                    <Confirmed cases={countryData.cases} todayCases={countryData.todayCases} />
                    <Active active={countryData.active} />
                    <Recovered recovered={countryData.recovered} />
                    <DeathRatio deathRatio={deathRatio} />
                    <Deaths deaths={countryData.deaths} todayDeaths={countryData.todayDeaths} />
                </div>
                <Disclaimer updated={countryData.updated} /> 
                <Cards />    
            </div>
        </body>
    )
}

export default App
