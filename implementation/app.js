const express = require('express');
const bodyParser = require('body-parser');
var verifier = require('alexa-verifier');

function init(config) {

    var app = express();
    var alexaRouter = express.Router();
    alexaRouter.use(function (req, res, next) {
        if (req._body) {
            var er = 'The raw request body has already been parsed.'
            return res.status(400).json({ status: 'failure', reason: er })
        }

        // TODO: if _rawBody is set and a string, don't obliterate it here!

        // mark the request body as already having been parsed so it's ignored by
        // other body parser middlewares
        req._body = true
        req.rawBody = ''
        req.on('data', function (data) {
            return req.rawBody += data
        })

        req.on('end', function () {
            var certUrl, er, error, signature

            try {
                req.body = JSON.parse(req.rawBody)
            } catch (error) {
                er = error
                req.body = {}
            }

            certUrl = req.headers.signaturecertchainurl
            signature = req.headers.signature

            verifier(certUrl, signature, req.rawBody, function (er) {
                if (er) {
                    res.status(400).json({ status: 'failure', reason: er })
                } else {
                    next()
                }
            })
        })
    });

    alexaRouter.use(bodyParser.json());
    app.use('/alexa', alexaRouter);
    app.use(express.static('implementation'));

    const coffee_app = require('./alexa').getAlexaApp();
    coffee_app.express(alexaRouter, "/", true);

    return app;
}

module.exports = {
    init: init
};
