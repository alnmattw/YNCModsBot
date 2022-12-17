// Telegram Methods
import axios from 'axios'
import 'dotenv/config'

const { BOT_TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`
const URI = `/webhook/${BOT_TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

export enum RequestMethods {
  GET='GET',
  POST='POST',
  PUT='PUT',
  DELETE='DELETE',
}

export async function sendTelegramMessage (chatId : string, message : string) {
  const options = {
    method: RequestMethods.POST,
    url: `${TELEGRAM_API}/sendMessage`,
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

export async function ClientInit () {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}