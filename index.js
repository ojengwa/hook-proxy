"use strict";
const restify = require('restify');
const request = require('request');

const server = restify.createServer({
    name: "proxis"
});


server.use(restify.bodyParser());

server.post('/hooks/codacy/trello', (req, res, next) => {
    const TRELLO_KEY = process.env.TRELLO_KEY;

    try {

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        res.send({
            speech: speech,
            displayText: speech,
            source: 'telemundo'
        });

    } catch (err) {

        res.send(400, {
            status: {
                code: 400,
                errorType: err.message
            }
        });

    }

    return next();
});

server.post('/hooks/trello/callback', (req, res, next) => {

    res.send({});
    return next();
});

server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening', server.name);
});