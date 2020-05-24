import React, {useEffect} from 'react';
import { faSortUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Aos from 'aos'
import "aos/dist/aos.css"


export const Confirmed = ({cases, todayCases}) =>{
    useEffect(() => Aos.init() , [])
    return(
        <div data-aos-duration="250" data-aos="fade-right" className='box confirmed'>
        <h2>الحالات المؤكدة</h2>
        <h3>{cases.toLocaleString('ar-eg')}</h3>
        <h5>{todayCases.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp}/></h5>
        </div>
    )
}
export const Active = ({active}) => {
    useEffect(() => Aos.init() , [])
    return(
        <div data-aos-duration="500" data-aos="fade-right" className='box active'>
        <h2>الحالات النشطة</h2>
        <h3>{active.toLocaleString('ar-eg')}</h3>
        </div>
    )
}
export const Recovered = ({recovered}) => {
    useEffect(() => Aos.init() , [])
    return(
    <div data-aos-duration="750" data-aos="fade-right" className='box recovered'>
    <h2>حالات الشفاء</h2>
    <h3>{recovered? recovered.toLocaleString('ar-eg'): "لم تعلن بعد"}</h3>
    </div>
    )
}
export const DeathRatio = ({deathRatio}) => {
    useEffect(() => Aos.init() , [])
    return( 
    <div data-aos-duration="1000" data-aos="fade-right" className='box death'>
    <h2>نسبة الوفيات</h2>
    <h3>٪ {deathRatio.toLocaleString('ar-eg',  {maximumSignificantDigits: 3})} </h3>
    </div>
    )
}
export const Deaths = ({deaths, todayDeaths}) => {
    useEffect(() => Aos.init() , [])
    return(
    <div data-aos-duration="1250" data-aos="fade-right" className='box dead'>
        <h2>الوفيات</h2>
        <h3>{deaths.toLocaleString('ar-eg')}</h3>
        <h5>{todayDeaths.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp}/></h5>
    </div>
    )
}
