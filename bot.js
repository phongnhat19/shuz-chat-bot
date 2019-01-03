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
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    } 

    bot.callSendAPI(sender_psid, response); 
}

// Handles messaging_postbacks events
bot.handlePostback = (sender_psid, received_postback) => {

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