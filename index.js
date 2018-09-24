"use strict";
const restify = require('restify');
const request = require('request');

const server = restify.createServer({
    name: "proxis"
});


server.use(restify.bodyParser());

server.post('/hooks/codacy/trello', (req, res, next) => {
    const TRELLO_KEY = process.env.TRELLO_KEY;
    const TRELLO_TOKEN = process.env.TRELLO_TOKEN;


    res.send({});
    return next();
});

server.post('/hooks/trello/callback', (req, res, next) => {

    res.send({});
    return next();
});

server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening', server.name);
});