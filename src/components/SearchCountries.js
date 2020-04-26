import React from 'react'
import UNFlag from '../countries/Flag_of_the_United_Nations.svg'
import Select from 'react-select'

const SearchCountries = ({Arabized, countryData, getCountryData}) => (
    <div className="search-container">
        {   countryData.countryInfo ? 
            <img className="flag" src={countryData.countryInfo.flag} alt=""/> : 
            <img className="flag" src={UNFlag} alt=""/>    }
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