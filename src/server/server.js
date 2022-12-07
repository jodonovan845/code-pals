const path = require('path');
const express = require('express');
const { send } = require('process')

const app = express();
const PORT = 8080;

// handle parsing of request body
app.use(express.json())

// handle static requests - HOW DOES THIS WORK WITH WEBPACK??
app.use(express.static('client'));

// handle get request to people
app.get('/', )