import React from 'react';
import { faSortUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Confirmed = ({cases, todayCases}) => (
    <div className='box confirmed'>
        <h2>الحالات المؤكدة</h2>
        <h3>{cases.toLocaleString('ar-eg')}</h3>
        <h5>{todayCases? todayCases.toLocaleString('ar-eg') : "۰"} <FontAwesomeIcon icon={faSortUp}/></h5>
    </div>
)
export const Active = ({active}) => (
    <div className='box active'>
        <h2>الحالات النشطة</h2>
        <h3>{active.toLocaleString('ar-eg')}</h3>
    </div>
)
export const Recovered = ({recovered}) => (
    <div className='box recovered'>
        <h2>حالات الشفاء</h2>
        <h3>{recovered? recovered.toLocaleString('ar-eg'): "لم تعلن بعد"}</h3>
    </div>
)
export const DeathRatio = ({deathRatio}) => (
    <div className='box death'>
        <h2>نسبة الوفيات</h2>
        <h3>٪ {deathRatio.toLocaleString('ar-eg',  {maximumSignificantDigits: 3})} </h3>
    </div>
)
export const Deaths = ({deaths, todayDeaths}) => (
    <div className='box dead'>
        <h2>الوفيات</h2>
        <h3>{deaths.toLocaleString('ar-eg')}</h3>
        <h5>{todayDeaths? todayDeaths.toLocaleString('ar-eg'): "۰" } <FontAwesomeIcon icon={faSortUp}/></h5>
    </div>
)
