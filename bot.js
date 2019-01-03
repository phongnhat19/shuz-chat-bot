const axios = require('axios')
const botConfig = require('./config')
let bot = {}
// Handles messages events
bot.handleMessage = (sender_psid, received_message) => {
    let response;

    // Check if the message contains text
    if (received_message.text) {    

        // Create the payload for a basic text message
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "You want to chat with the bot or the person?",
                        "subtitle": "Tap a button to answer.",
                        "buttons": [
                        {
                            "type": "postback",
                            "title": "Bot!",
                            "payload": "bot",
                        },
                        {
                            "type": "postback",
                            "title": "Person!",
                            "payload": "person",
                        }
                        ],
                    }]
                }
            }
        }
    } 

    bot.callSendAPI(sender_psid, response); 
}

// Handles messaging_postbacks events
bot.handlePostback = (sender_psid, received_postback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'bot') {
        response = { "text": "Jarvis the Bot!" }
    } else if (payload === 'person') {
        response = { "text": "Jarvis the Person" }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
bot.callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    axios({
        method: 'post',
        url: 'https://graph.facebook.com/v2.6/me/messages',
        data: request_body,
        params: {
            access_token: botConfig.PAGE_ACCESS_TOKEN
        }
    })
}

module.exports = bot