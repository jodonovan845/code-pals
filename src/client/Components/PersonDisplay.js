import React, { Component } from "react";
import { render } from 'react-dom';

class PersonDisplay extends Component {
    // this needs to display the person list
    render () {
        // console.log('PROPS IN PERSON DISPLAY', this.props)
        // console.log('THIS IS THE PROPS: ', this.props.personList);
        const personListArr = [];
        for(const el of this.props.personList) {
            personListArr.push(
                <div className="individual" key={'individual'}>
                    <div className="name" key={'nameOfUser'}>{el.name}</div>
                    <div key={'pointsOfUser'}>{el.points}</div>
                    <div>
                        <div className="addAndSub">
                            <button onClick={this.props.addPoints(el.points)} key={'addButton'}>↑</button>
                            <button onClick={this.props.removePoints(el.points)} key={'subButton'}>↓</button>
                        </div>
                        <button /*onClick={this.props.removePerson(el.person_id)}*/ key={'removeButton'}>Remove Pal</button>
                    </div>
                </div>
            )
        }
        // console.log('THIS IS THE ARRAY OF DIVS: ', personListArr);
        return (
            <div className="boxOfPeople" key={'boxOfPeople'}>{ personListArr }</div>
        )
    }
}

export default PersonDisplay;