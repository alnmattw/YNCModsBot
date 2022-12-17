import 'dotenv/config'
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import { sendTelegramMessage } from '../telegram/MethodOptions'
import { TelegramResponseOptions } from '../constants/MessageOptions'
import { ModuleCollection } from '../modules/ModuleMethods'
import { TelegramCommands } from '../telegram/CommandOptions'

const { BOT_ID, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_ID}`
const URI = `/webhook/${BOT_ID}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)
    try {
      const chatId : string = await req.body.message.chat.id.toString()
      const text : string = await req.body.message.text.toString()

      switch (text) {
        case TelegramCommands.Start:
          await sendTelegramMessage(chatId, TelegramResponseOptions.Start)
          break 
        case TelegramCommands.SelectModules:
          await sendTelegramMessage(chatId, TelegramResponseOptions.SelectModules)
          break
        case TelegramCommands.AcademicYearOptions:
          await sendTelegramMessage(chatId, TelegramResponseOptions.AcademicYearOptions)
          break
        case TelegramCommands.AcademicSemesterOptions:
          await sendTelegramMessage(chatId, TelegramResponseOptions.AcademicSemesterOptions)
          break
        case TelegramCommands.ModulePrefixOptions:
          await sendTelegramMessage(chatId, TelegramResponseOptions.ModulePrefixOptions)
          break
        case TelegramCommands.ModuleLevelOptions:
          await sendTelegramMessage(chatId, TelegramResponseOptions.ModuleLevelOptions)
          break
        default:
          const userMessage : string[] = text.split(',')
          const optionAcademicYear : string = userMessage[0].trim()
          const optionModulePrefixCode : string = userMessage[1].trim().toString()
          const optionModuleLevel : string = userMessage[2].trim()
          const optionAcademicSemester : number = parseInt(userMessage[3].trim())
          
          const moduleCollection = new ModuleCollection()
          const moduleSelectionSummary = await moduleCollection.getModuleSelectionMessage(optionAcademicYear, optionAcademicSemester, optionModulePrefixCode, optionModuleLevel)
          const moduleSelectionSummaryMessage = moduleSelectionSummary.join('\n')
          await sendTelegramMessage(chatId, moduleSelectionSummaryMessage)
      }
      return res.send()
    }
    catch (error) {
      console.error(error)
    }
})

app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})