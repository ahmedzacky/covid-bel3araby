import React from "react"
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
import { faSortUp } from "@fortawesome/free-solid-svg-icons";



export default class App extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                confirmed: 0,
                recovered: 0,
                deaths: 0,
                active: 0,
                deathRatio: 0,
                todayCases: 0,
                todayDeath: 0,
                lastUpdated: null,
                countries: [],
                Arabized: []
            }
        this.getData = this.getData.bind(this)
        this.getCountryData = this.getCountryData.bind(this)
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        const resApi = await Axios.get('https://corona.lmao.ninja/all')
        const resCountries = await Axios.get("https://corona.lmao.ninja/countries");
        const countries = [];
        const Arabized= [];

        /* Importing ISO2 country names */
        for(let k = 0; k < resCountries.data.length; k++){
            if (resCountries.data[k].countryInfo.iso2 !== null){
                countries.push(resCountries.data[k].countryInfo.iso2);
            }
        }

        this.setState({countries : countries})

        /* Arabization of country options */
        for(let j=0; j<this.state.countries.length;j++){
            for(let i=0; i<ArCountries.arcountries.length;i++){
                if( ArCountries.arcountries[i].code !== undefined &&  ArCountries.arcountries[i].code === this.state.countries[j]){
                Arabized.push({value: this.state.countries[j], label: ArCountries.arcountries[i].name})
                }
            }
        }

        /* Setting global state and saving default data*/
        this.setState({
            confirmed: resApi.data.cases,
            recovered: resApi.data.recovered,
            deaths: resApi.data.deaths, 
            active: resApi.data.active,
            todayCases: resApi.data.todayCases,
            todayDeath: resApi.data.todayDeaths,
            deathRatio: ((resApi.data.deaths / resApi.data.cases) * 100),
            lastUpdated: resApi.data.updated,
            Arabized: Arabized,
        })
    }

    /* Setting state for chosen country*/
    async getCountryData(event){
        if (event === null){
            return this.getData()
        }
        const res = await Axios.get(`https://corona.lmao.ninja/countries/${event.value}`)
        this.setState({
            confirmed: res.data.cases,
            recovered: res.data.recovered,
            deaths: res.data.deaths, 
            active: res.data.active,
            todayCases: res.data.todayCases,
            todayDeath: res.data.todayDeaths,
            deathRatio: ((res.data.deaths / res.data.cases) * 100),
            lastUpdated: res.data.updated,        })
    }

    /* Rendering each country as a dropdown option*/
    renderSearch(){
        return <Select
            isRtl
            isClearable
            placeholder="عالميًا"
            className="dropdown" 
            options={this.state.Arabized}
            value={this.state.Arabized.value}
            onChange={this.getCountryData}
        />
    }
    /* Rendering main App*/
    render(){
        return (
        <div className="container">
            <h1>اخر احصائيات فيروس الكورونا</h1>    
                {this.renderSearch()}
            <div className='flex'>
                <div className='box confirmed'>
                    <h2>الحالات المؤكدة</h2>
                    <h3>{(this.state.confirmed).toLocaleString('ar-eg')}</h3>
                    <h5>{(this.state.todayCases).toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp} /> </h5>
                </div>
                <div className='box active'>
                    <h2>الحالات النشطة</h2>
                    <h3>{(this.state.active).toLocaleString('ar-eg')}</h3>
                </div>
                <div className='box recovered'>
                    <h2>حالات الشفاء</h2>
                    <h3>{(this.state.recovered).toLocaleString('ar-eg')}</h3>
                </div>
                
                <div className='box death'>
                    <h2>نسبة الوفيات</h2>
                    <h3>% {(this.state.deathRatio).toLocaleString('ar-eg',  { maximumSignificantDigits: 3 })} </h3>
                    
                </div>
                <div className='box dead'>
                    <h2>الوفيات</h2>
                    <h3>{(this.state.deaths).toLocaleString('ar-eg')}</h3>
                    <h5>{this.state.todayDeath.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp} /> </h5>
                </div>
            </div>
            <div>   
                    <p className="disclaimer">المعلومات اليومية موجودة اسفل الاحصائات الكلية</p>
                    <p className="disclaimer">اذا كانت تساوي صفر فهذا معناه ان احصائات اليوم لم تنشر بعد</p>
                    <p>اخر تحديث</p>
                    <p className="date">{(new Date(this.state.lastUpdated)).toLocaleString('ar-eg')}</p>
            </div>
            <div className="warning">
            لا يوجد حاليًا لقاح للوقاية من فيروس الكورونا، يمكنك حماية نفسك والمساعدة في منع انتشار الفيروس للآخرين 
            </div>
            <div className="flex">
                <div className="card info">
                    <p>تجنب المصافحة و حافظ على مسافه امنه بينك وبين الأشخاص</p>
                    <Animation name="avoidcontact" data={AvoidContact} />
                </div>
                <div className="card info">
                    <p>اغسل يديك جيدا بالماء والصابون لمدة 20 ثانية</p>
                    <Animation name="washhands" data={WashHands} />
                </div>
                <div className="card info">
                    <p>ابقى بالمنزل واعزل نفسك اذا شعرت بأعراض المرض</p>
                    <Animation name="isolate" data={Isolate} />
                </div>
                <div className="card info">
                    <p>اذا وجب عليك التواجد في اماكن مزدحمة، تأكد من وضع القناع الواقي</p>
                    <Animation name="covermouth" data={CoverMouth} />
                </div>
            </div> 
            
        </div>
        )
    }
} 
