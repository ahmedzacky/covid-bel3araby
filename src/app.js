import React, {Component} from "react"
import Axios from "axios"
import "./style.css"
import { Animation} from './components/Animation'
import CoverMouth from './animation/covermouth.json';
import WashHands from './animation/washhands.json';
import Isolate from './animation/isolate.json'
import AvoidContact from './animation/avoidcontact.json'
import ArCountries from './countries/countries.json'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp } from "@fortawesome/free-solid-svg-icons"
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import UNFlag from './countries/Flag_of_the_United_Nations.svg'

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


    /* Rendering each country as a dropdown option*/
    renderSearch(){
        return( 
        <div className="search-container">
            {   this.state.countryData.countryInfo? 
                <img className="flag" src={this.state.countryData.countryInfo.flag} alt=""/> : 
                <img className="flag" src={UNFlag} alt=""/>    }
            <Select
                isRtl
                isClearable
                placeholder="عالميًا"
                className="dropdown" 
                options={this.state.Arabized}
                value={this.state.Arabized.value}
                onChange={this.getCountryData}
            />
        </div>
    )}


    /* Rendering main App*/
    render(){
        let deathRatio = 0
        deathRatio = this.state.countryData.deaths && (this.state.countryData.deaths / this.state.countryData.cases)*100 ;
        return (
        <div className="container">
            <a href="https://github.com/ahmedzacky/covid-bel3araby" className="github"><FontAwesomeIcon icon={faGithub} /></a>
            <h1> اخر احصائيات فيروس الكورونا</h1>    
            {this.renderSearch()}
            <div className='flex'>
                <div className='box confirmed'>
                    <h2>الحالات المؤكدة</h2>
                    <h3>{this.state.countryData.cases.toLocaleString('ar-eg')}</h3>
                    <h5>{this.state.countryData.todayCases.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp}/></h5>
                </div>
                <div className='box active'>
                    <h2> الحالات النشطة</h2>
                    <h3>{this.state.countryData.active.toLocaleString('ar-eg')}</h3>
                </div>
                <div className='box recovered'>
                    <h2> حالات الشفاء </h2>
                    <h3>{this.state.countryData.recovered.toLocaleString('ar-eg')}</h3>
                </div>
                <div className='box death'>
                    <h2> نسبة الوفيات  </h2>
                    <h3>٪ {deathRatio.toLocaleString('ar-eg',  {maximumSignificantDigits: 3})} </h3> 
                    
                </div>
                <div className='box dead'>
                    <h2> الوفيات</h2>
                    <h3>{this.state.countryData.deaths.toLocaleString('ar-eg')}</h3>
                    <h5>{this.state.countryData.todayDeaths.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp} /> </h5>
                </div>
            </div>
            <div>   
                    <p>اخر تحديث</p>
                    <p className="date">{new Date(this.state.countryData.updated).toLocaleString('ar-eg')}</p>
                    <br/>
                    <p className="warning"><FontAwesomeIcon icon={faSortUp} /> احصائات اليوم *</p>
                    <p className="warning">من الوارد ان تكون أرقام اليوم لم تحدث بعد</p>
                    
            </div>
            <div className="disclaimer">
            لا يوجد حاليًا لقاح للوقاية من فيروس الكورونا، يمكنك حماية نفسك والمساعدة في منع انتشار الفيروس للآخرين 
            </div>
            <div className="flex">
                <div className="card-info">
                    <p>تجنب المصافحة و حافظ على مسافه امنه بينك وبين الأشخاص</p>
                    <Animation name="avoidcontact" data={AvoidContact} />
                </div>
                <div className="card-info">
                    <p>اغسل يديك جيدا بالماء والصابون لمدة ٢٠ ثانية</p>
                    <Animation name="washhands" data={WashHands} />
                </div>
                <div className="card-info">
                    <p>ابقى بالمنزل واعزل نفسك اذا شعرت بأعراض المرض</p>
                    <Animation name="isolate" data={Isolate} />
                </div>
                <div className="card-info">
                    <p>اذا وجب عليك التواجد في اماكن مزدحمة، تأكد من وضع القناع الواقي</p>
                    <Animation name="covermouth" data={CoverMouth} />
                </div>
            </div>             
        </div>
        )
    }
} 
