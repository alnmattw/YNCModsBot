import express from 'express'
import bodyParser from 'body-parser'
import { sendTelegramMessage } from '../telegram/MethodOptions'
import '../telegram/CommandOptions'

const bot = express()
const port = 80
const TELEGRAM_BOT_TOKEN = process.env.BOT_ID
const URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

// Configurations
bot.use(bodyParser.json());

// Endpoints
bot.post('/', (req, res) => {
  const chatId = req.body.message.chat.id
  const sentMessage = req.body.message.text
  
  if (sentMessage == 'hello') {
    sendTelegramMessage(chatId, 'hello back 👋')
  } 
  
 if (sentMessage == 'modules') {
    sendTelegramMessage(chatId, 'Here is a list of modules: \n\n1. Module 1 \n2. Module 2 \n3. Module 3')
  }

  else {
    res.status(200).send({})
  }
})

// Listening
bot.listen(port, () => {
  console.log(`Listening on port ${port}`)
})