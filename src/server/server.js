const path = require('path');
const express = require('express');
const { send } = require('process')
const cors = require('cors');

// import controllers
const peopleController = require('./controllers/peopleController.js');

const app = express();
const PORT = 8080;

// use cors
app.use(cors());

// handle parsing of request body
app.use(express.json())

// handle static requests - HOW DOES THIS WORK WITH WEBPACK??
app.use(express.static('client'));

// handle get request to people
app.get('/', peopleController.getPeople, (req,res) => {
    res.set({
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
    });
    console.log(res.locals.everyone)
    res.status(200).json(res.locals.everyone);
})

// handle post request to people
app.post('/student', peopleController.addPerson, (req, res) => {
    console.log('THE ID IN THE SERVER CB: ', res.locals.id)
    res.status(200).json(res.locals.id);
})

// handle patch requests to change score
app.patch('/upscore/:id', peopleController.upScore, (req, res) => {
    res.status(200).json();
})

app.patch('/downscore/:id', peopleController.downScore, (req, res) => {
    res.status(200).json();
})

app.delete('/delete/:id', peopleController.deletePerson, (req, res) => {
    res.status(200).json();
})

// 404 error handling
app.use('/', (req,res) => {
    res.status(404).json()
})

// global error handling
app.use((err, req, res, next)=>{
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    }
    const errorObj = Object.assign({},defaultError,err)
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})