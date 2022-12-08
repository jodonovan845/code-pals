import React, { Component } from "react";
import { render } from 'react-dom';

class RankZone extends Component {
    // return the person list
    render () {
        return (
            <div className="rankingsArea">
                <PersonMaker />
                <PersonDisplay />
            </div>
        )
    }
}

export default RankZone;