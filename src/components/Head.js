import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

const Head = () => (
    <header>
    <a href="https://github.com/ahmedzacky/covid-bel3araby" className="github"><FontAwesomeIcon icon={faGithub} /></a>
    <h1> اخر احصائيات فيروس الكورونا</h1>
    </header>
)

export default Head