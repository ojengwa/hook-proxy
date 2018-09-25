"use strict";
const restify = require('restify');
const request = require('request');

const server = restify.createServer({
    name: "proxis"
});


server.use(restify.bodyParser());

server.post('/hooks/codacy/trello', (req, res, next) => {
    const TRELLO_API_KEY = process.env.TRELLO_KEY;
    const TRELLO_API_TOKEN = process.env.TRELLO_TOKEN;
    const TRELLO_API_URL = `https://api.trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;
    const BOARD_LIST_ID = '5ba6a9f407c57d6b9cc105c2';

    const payload = {
        name: '',
        desc: '',
        pos: 'top',
        idList: BOARD_LIST_ID,
        idLabels: 'Bug',
    }

    const options = {
        url: TRELLO_API_URL,
        json: payload
    }

    request.post(options, function(error, response, body) {
        if (error) throw new Error(error);

        res.send(body);
    })
    return next();
});

server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening', server.name);
});