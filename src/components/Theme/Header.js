import React, { useState } from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {Moon, Sun} from './Icons'

const GlobalStyle = createGlobalStyle
`
.container{
    background-color: ${props => props.theme.mode==='dark' ? '#27253B': '#fbfbfb'};
    color: ${props => props.theme.mode==='dark' ? '#fbfbfb': '#3b3858'};
}
.card-info {
    background-color: ${props => props.theme.mode==='dark' ? '#3B3858': '#fbfbfb'};
}
`

const Header = () => {
    const [theme, setTheme] = useState({mode: 'dark'})
    return (
    <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <button
            className="btn svg"
            onClick={() => setTheme(theme.mode === 'light'? {mode:'dark'} : {mode:'light'})}
        >
            {theme.mode==="light"?
            <Moon /> : 
            <Sun /> }
        </button>
        <h1>اخر احصائيات فيروس الكورونا</h1>
    </ThemeProvider>
)}

export default Header