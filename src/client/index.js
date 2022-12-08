import './styles/main.scss'
import React, { Component } from 'react';
import { render } from 'react-dom';
import RankZone from './Components/RankZone.js';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            personInfo: {
                firstname: '',
                lastname: '',
                points: 0
            }
        }
    }

    render() {
        return [
            <h1 className='head'>POWER RANKINGS</h1>,
            <RankZone />
        ]
    }

    addPoints () {

    }

    removePoints () {

    }
}

render(<App />, document.querySelector('#root'));