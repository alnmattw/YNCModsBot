// Telegram Methods
import axios from 'axios'
const TELEGRAM_BOT_TOKEN = process.env.BOT_ID
const TELEGRAM_CHAT_ID = process.env.CHANNEL_ID 

export enum RequestMethods {
  GET='GET',
  POST='POST',
  PUT='PUT',
  DELETE='DELETE',
}

export async function sendTelegramMessage (message: string) {
  const options = {
    method: RequestMethods.GET,
    url: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    params: {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    },
  }
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}