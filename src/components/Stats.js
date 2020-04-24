import React from 'react';
import { faSortUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Confirmed = (props) => (
    <div className='box confirmed'>
        <h2>الحالات المؤكدة</h2>
        <h3>{props.cases.toLocaleString('ar-eg')}</h3>
        <h5>{props.todayCases.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp}/></h5>
    </div>
)
export const Active = (props) => (
    <div className='box active'>
        <h2>الحالات النشطة</h2>
        <h3>{props.active.toLocaleString('ar-eg')}</h3>
    </div>
)
export const Recovered = (props) => (
    <div className='box recovered'>
        <h2>حالات الشفاء</h2>
        <h3>{props.recovered? props.recovered.toLocaleString('ar-eg'): "لم تعلن بعد"}</h3>
    </div>
)
export const DeathRatio = (props) => (
    <div className='box death'>
        <h2>نسبة الوفيات</h2>
        <h3>٪ {props.deathRatio.toLocaleString('ar-eg',  {maximumSignificantDigits: 3})} </h3>
    </div>
)
export const Deaths = (props) => (
    <div className='box dead'>
        <h2>الوفيات</h2>
        <h3>{props.deaths.toLocaleString('ar-eg')}</h3>
        <h5>{props.todayDeaths.toLocaleString('ar-eg')} <FontAwesomeIcon icon={faSortUp}/></h5>
    </div>
)
