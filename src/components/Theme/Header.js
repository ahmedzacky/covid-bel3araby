import React, { useState } from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {Moon, Sun} from './Icons'

const GlobalStyle = createGlobalStyle
`
body{
    background-color: ${props => props.theme.darkMode? '#27253B': '#fbfbfb'};
    color: ${props => props.theme.darkMode? '#fbfbfb': '#3b3858'};
}
.card-info {
    background-color: ${props => props.theme.darkMode? '#3B3858': '#fbfbfb'};
}
`

const Header = () => {
    const [theme, setTheme] = useState({darkMode: true})
    return (
    <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <button
            className="btn svg"
            onClick={() => setTheme(theme.darkMode === false? {darkMode: true} : {darkMode:false})}
        >
            {theme.darkMode===false?
            <Moon /> : 
            <Sun /> }
        </button>
        <h1>اخر احصائيات فيروس الكورونا</h1>
    </ThemeProvider>
)}

export default Header