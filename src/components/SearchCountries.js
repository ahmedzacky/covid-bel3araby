import React from 'react'
import UNFlag from '../countries/Flag_of_the_United_Nations.svg'
import Select from 'react-select'

const SearchCountries = ({Arabized, countryData, getCountryData}) => (
    <div className="search-container">
        {countryData.countryInfo ? <img className="flag" src={countryData.countryInfo.flag} alt=""/> : <img className="flag" src={UNFlag} alt=""/> }
        <label style={{display: "none"}} for="form">Form label for perfomance</label>
        <Select
            aria-label="align center"
            isRtl
            isClearable
            placeholder="عالميًا"
            id="form"
            className="dropdown" 
            options={Arabized}
            value={Arabized.value}
            onChange={getCountryData}
            theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    neutral50: '#1a1a1a',
                },
            })}
        />
    </div>
)

export default SearchCountries