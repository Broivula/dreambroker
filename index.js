'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const parser = require('./parser.js');
const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.post('/analyze', (req, res) =>{
    let text = req.body.text;
    //console.log(req.body.text);
    //parser.textParser(text).then((responseJSON) => {res.json(responseJSON)});
    res.json(parser.textParser(text));
});
app.listen(2222 ,() => {console.log('server running on port 2222')});
