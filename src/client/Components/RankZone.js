import React, { Component } from "react";
import { render } from 'react-dom';
import PersonDisplay from "./PersonDisplay.js";
import PersonMaker from "./PersonMaker.js";


class RankZone extends Component {
    constructor (props) {
        super(props);
        this.state = {
            personInfo: {
                firstname: '',
                lastname: '',
                points: 0,
            },
            personList: []
        }
        this.getPeopleList = this.getPeopleList.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.removePoints = this.removePoints.bind(this);
    }

    // return the person list
    render () {
        return (
            <div className="rankingsArea">
                <PersonMaker />
                <PersonDisplay personList={this.state.personList}/>
            </div>
        )
    }

    addPoints () {

    }

    removePoints () {

    }

    async getPeopleList () {
        // make a fetch request to the database, set the state using that data
        const data = await fetch('http://localhost:8080/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then( (response) => response.json());
        console.log(data)

        // set the state
        const copyInfo = this.state.personInfo;
        this.setState({
            personInfo: {
                ...copyInfo
            },
            personList: data
        })
        console.log(this.state);
    }

    componentDidMount () {
        // set personList in state to the users in the database
        this.getPeopleList()
        // display the peopleList array on the page
        // <PersonDisplay personList={this.state.personList}/>

    }
}

export default RankZone;