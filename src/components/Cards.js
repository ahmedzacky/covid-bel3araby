import React, {useEffect} from 'react';
import { Animation} from './Animation'
import CoverMouth from '../animation/covermouth.json';
import WashHands from '../animation/washhands.json';
import Isolate from '../animation/isolate.json'
import AvoidContact from '../animation/avoidcontact.json'
import Aos from 'aos'
import "aos/dist/aos.css"

const Cards = () => {
    useEffect(() => Aos.init({duration: 1000}) , [])
    return(
        <div className="flex">
        <div data-aos="fade-up" className="card-info">
            <p>تجنب المصافحة و حافظ على مسافه امنه بينك وبين الأشخاص</p>
            <Animation name="avoidcontact" data={AvoidContact} />
        </div>
        <div data-aos="fade-up" className="card-info">
            <p>اغسل يديك جيدا بالماء والصابون لمدة ٢٠ ثانية</p>
            <Animation name="washhands" data={WashHands} />
        </div>
        <div data-aos="fade-up" className="card-info">
            <p>ابقى بالمنزل واعزل نفسك اذا شعرت بأعراض المرض</p>
            <Animation name="isolate" data={Isolate} />
        </div>
        <div data-aos="fade-up" className="card-info">
            <p>اذا وجب عليك التواجد في اماكن مزدحمة، تأكد من وضع القناع الواقي</p>
            <Animation name="covermouth" data={CoverMouth} />
        </div>
    </div>
    )
}

export default Cards