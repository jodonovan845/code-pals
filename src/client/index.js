import './styles/main.scss'
import React, { Component } from 'react';
import { render } from 'react-dom';
import RankZone from './Components/RankZone.js';

class App extends Component {


    render() {
        return [
            <h1 className='head'>POWER RANKINGS</h1>,
            <RankZone />
        ]
    }


}

render(<App />, document.querySelector('#root'));