import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import { sendTelegramMessage, ClientInit } from '../telegram/MethodOptions'
import { TelegramResponseOptions } from '../constants/MessageOptions'
import { ModuleCollection, ParameterOptions } from '../modules/ModuleMethods'
import { TelegramCommands } from '../telegram/CommandOptions'
import { AModuleLevelOptions, AModulePrefixOptions, ASemesterOptions, AYearOptions } from '../constants/SelectionOptions'

const { BOT_TOKEN } = process.env
const URI = `/webhook/${BOT_TOKEN}`

const bot = express()
bot.use(bodyParser.json())

ClientInit()

bot.post(URI, async (req, res) => {
    try {
      const chatId: string = await req.body.message.chat.id.toString()
      const text: string = await req.body.message.text.toString()

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
          const moduleCollection = new ModuleCollection()
          const validInput = await moduleCollection.verifyInput(text)
          let telegramMessage: string
          if (validInput) {
            const texts: string[] = text.split(',').map((message) => message.trim())
            const optionAcademicYear: string = moduleCollection.matchEnumValue(AYearOptions, texts[ParameterOptions.AcademicYear]).toString()
            const optionAcademicSemester: number = parseInt(moduleCollection.matchEnumValue(ASemesterOptions, texts[ParameterOptions.AcademicSemester]))
            const optionModulePrefixCode: string = moduleCollection.matchEnumValue(AModulePrefixOptions, texts[ParameterOptions.ModulePrefixCode]).toString()
            const optionModuleLevel: string = moduleCollection.matchEnumValue(AModuleLevelOptions, texts[ParameterOptions.ModuleLevel]).toString()
            
            const moduleSelectionSummary = await moduleCollection.getModuleSelectionMessage(optionAcademicYear, optionAcademicSemester, optionModulePrefixCode, optionModuleLevel)
            const moduleSelectionSummaryMessage = moduleSelectionSummary.join('\n')
            telegramMessage = `There are ${moduleSelectionSummary.length} modules available for the following selection: \n\n${moduleSelectionSummaryMessage}`
            await sendTelegramMessage(chatId, telegramMessage)
          } else {
            await sendTelegramMessage(chatId, TelegramResponseOptions.InvalidInput)
          } 
          
      }
      return res.send()
    }
    catch (error) {
      console.error(error)
    }
})

bot.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 bot running on port', process.env.PORT || 5000)
})