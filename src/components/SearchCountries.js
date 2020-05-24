import React from 'react'
import UNFlag from '../countries/Flag_of_the_United_Nations.svg'
import Select from 'react-select'

const SearchCountries = ({Arabized, countryData, getCountryData}) => (
    <div className="search-container">
        {countryData.countryInfo ? countryData.countryInfo.iso2 === 'LY' ? <img className="flag" src="https://secure.i.telegraph.co.uk/multimedia/archive/01831/gad_1831472c.jpg" alt=""/>  : <img className="flag" src={countryData.countryInfo.flag} alt=""/> : <img className="flag" src={UNFlag} alt=""/> }
        <Select
            isRtl
            isClearable
            placeholder="عالميًا"
            className="dropdown" 
            options={Arabized}
            value={Arabized.value}
            onChange={getCountryData}
        />
    </div>
)

export default SearchCountries