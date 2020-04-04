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

export default class App extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                confirmed: 0,
                recovered: 0,
                deaths: 0,
                active: 0,
                deathRatio: 0,
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
        const resApi = await Axios.get('https://covid19.mathdro.id/api')
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        const Arabized= [];

        /* Importing ISO2 country names */
        for(let k = 0; k < resCountries.data.countries.length; k++){
            if (resCountries.data.countries[k].iso2 !== undefined){
                countries.push(resCountries.data.countries[k].iso2);
            }
        }

        this.setState({
            countries : countries
        })

        /* Arabization */
        for(let j=0; j<this.state.countries.length;j++){
            for(let i=0; i<ArCountries.arcountries.length;i++){
                if( ArCountries.arcountries[i].code !== undefined &&  ArCountries.arcountries[i].code === this.state.countries[j]){
                Arabized.push(ArCountries.arcountries[i].name)
                }
            }
        }

        /* Setting global state and saving default data*/
        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value, 
            active: resApi.data.confirmed.value - resApi.data.recovered.value - resApi.data.deaths.value ,
            deathRatio: ((resApi.data.deaths.value / resApi.data.confirmed.value) * 100),
            lastUpdated: resApi.data.lastUpdate,
            Arabized: Arabized,
        })
        console.log(this.state.deathRatio)
    }

    /* Setting state for chosen country*/
    async getCountryData(event){
        if (event === null){
            return this.getData()
        }
        const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${event.value}`)
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value,
            active: res.data.confirmed.value - res.data.recovered.value - res.data.deaths.value,
            deathRatio: ((res.data.deaths.value / res.data.confirmed.value) * 100),
            lastUpdated: res.data.lastUpdate
        })
        console.log(this.state.deathRatio)
    }

    /* Rendering each country as a dropdown option*/
    renderSearch(){
        var Arabic = this.state.Arabized;
        var English = this.state.countries;
        var options = []
        for(var i = 0; i<Arabic.length;i++){
            options.push({value: English[i], label: Arabic[i]})
        }
        return <Select
            isRtl
            isClearable
            placeholder="عالميًا"
            className="dropdown" 
            options={options}
            value={options.value}
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
                    <h3>%{(this.state.deathRatio).toLocaleString('ar-eg', { maximumSignificantDigits: 3 })}</h3>
                </div>
                <div className='box dead'>
                    <h2>الوفيات</h2>
                    <h3>{(this.state.deaths).toLocaleString('ar-eg')}</h3>
                </div>
            </div>
            <div>
                    <p>اخر تحديث</p>
                    <p className="date">{new Date(this.state.lastUpdated).toLocaleString('ar-eg')}</p>
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
