import React from 'react'
import UNFlag from '../countries/Flag_of_the_United_Nations.svg'
import Select from 'react-select'

const SearchCountries = (props) => (
    <div className="search-container">
        {   props.countryData.countryInfo ? 
            <img className="flag" src={props.countryData.countryInfo.flag} alt=""/> : 
            <img className="flag" src={UNFlag} alt=""/>    }
        <Select
            isRtl
            isClearable
            placeholder="عالميًا"
            className="dropdown" 
            options={props.Arabized}
            value={props.Arabized.value}
            onChange={props.getCountryData}
        />
    </div>
)

export default SearchCountries