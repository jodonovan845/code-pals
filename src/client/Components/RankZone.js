import React, { Component } from "react";
import { render } from 'react-dom';
import PersonDisplay from "./PersonDisplay.js";
import PersonMaker from "./PersonMaker.js";


class RankZone extends Component {
    constructor (props) {
        super(props);
        this.state = {
            personInfo: {
                person_id: null,
                name: '',
                points: 0,
            },
            personList: []
        }
        this.getPeopleList = this.getPeopleList.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.removePoints = this.removePoints.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addName = this.addName.bind(this);
        this.updatePersonList = this.updatePersonList.bind(this);
    }

    // return the person list
    render () {
        return (
            <div className="rankingsArea" key={'rankingsArea'}>
                <PersonMaker name={this.state.personInfo.name} updatePersonList={this.updatePersonList} addName={this.addName} key={'maker'}/>
                <PersonDisplay personList={this.state.personList} /*removePerson={this.removePerson}*/ removePoints={this.removePoints} addPoints={this.addPoints} key={'list'}/>
            </div>
        )
    }

    addPoints () {

    }

    removePoints () {

    }

    addName (name) {
        // update the personList instead of the name in state
        // console.log(name);
        // console.log(this.state)
        const copyInfo = this.state.personInfo;
        copyInfo.name = name;
        this.setState({
            personInfo: {
                ...copyInfo
            }
        })
        // console.log(this.state)
    }

    async updatePersonList (name, data=null) {
        console.log('STATE WITH NEW PERSONLIST: ', this.state)
        data = await fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }).then( (response)=> response.json())

        console.log('THIS IS THE ID PASSED BACK TO FRONT END', data)
        // console.log('UPDATE PERSONLIST FIRING')
        // console.log(name);
        // console.log(this.state)
        const copyPersonList = this.state.personList;
        copyPersonList.push({person_id: data, name: name, points: 0})
        this.setState({
            personList: copyPersonList
        })
        // update the state with the id of the newly added person

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
        // console.log(data)

        // set the state
        const copyInfo = this.state.personInfo;
        this.setState({
            personInfo: {
                ...copyInfo
            },
            personList: data
        })
        // console.log(this.state);
    }

    // async removePerson (id) {
    //     console.log('ID IN REMOVE PERSON:', id)
    //     await fetch(`http://localhost:8080/delete/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    // }

    // do i need to make this async?
    async componentDidMount () {
        // set personList in state to the users in the database
        await this.getPeopleList();
        // display the peopleList array on the page
        <PersonDisplay personList={this.state.personList}/>
        
    }
}

export default RankZone;