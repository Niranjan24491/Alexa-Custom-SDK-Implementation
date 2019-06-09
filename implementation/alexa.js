function getAlexaApp() {

    var alexa = require("alexa-app");

    function startBot(alexa_req, alexa_res) {
        alexa_res.shouldEndSession(false);

        if (alexa_req.data.request.type === 'LaunchRequest') {
            alexa_res.say(`Hello. How can I help you with today. You can choose between coffee, tea or some soft drinks.`);
        } else if(alexa_req.data.request.type === 'IntentRequest') {
            const mathNumber = Math.floor(Math.random() * 10);
            alexa_res.say(`Sure. Your order will be served to you in 10 minutes and your token is ${mathNumber}. Thank You`);
            alexa_res.shouldEndSession(true);
        }
    }

    var alexa_app = new alexa.app('coffeeshop');
    alexa_app.intent("selectedDrink", {}, startBot);
    alexa_app.intent("welcome", {}, startBot);
    alexa_app.sessionEnded(function (request, response) {
        // cleanup the user's server-side session
        response.shouldEndSession(true);
        // no response required
    });
    alexa_app.launch(startBot);

    return alexa_app;
};

module.exports = {
    getAlexaApp: getAlexaApp
};
