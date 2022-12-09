import React, { Component } from "react";
import { render } from 'react-dom';

const PersonMaker = props => {
    // this is where i define the click handler
    function clickHandler (e) {
        // console.log(document.getElementById(personText));
        // send name info and score of 0 to DB
        // console.log('FIRING')
        console.log('CLICKHANDLER PROPS.NAME: ', props.name)
        props.updatePersonList(props.name);

        // then need to rerender - use componentDidUpdate and make it identical to componentDidMount
    }
    // this renders the form with functionality 
        return (
            <div>
                <h3>Add a pal to mercilessly judge</h3>
                <div>
                    <h4>Name:</h4>
                        <input
                            type='text'
                            id='personText'
                            onChange={e => {props.addName(e.target.value)}} // this will change the name state to the input
                        />
                        <button type='button' onClick={clickHandler} /* this takes updated state which was passed in and send to DB */>JUDGE</button> 
                </div>
            </div>
        )
}

export default PersonMaker;