// Telegram Methods
import axios from 'axios'
import 'dotenv/config'

const TELEGRAM_BOT_TOKEN = process.env.BOT_ID

export enum RequestMethods {
  GET='GET',
  POST='POST',
  PUT='PUT',
  DELETE='DELETE',
}

export async function sendTelegramMessage (chatId : string, message : string) {
  const options = {
    method: RequestMethods.POST,
    url: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    data: {
      "chat_id" : chatId,
      "text" : message
    }
  }
  await axios
  .request(options)
  .then(async () => {
    console.log('Message sent')
  })
  .catch((error) => {
    console.error(error)
  })
}