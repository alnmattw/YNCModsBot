import axios from 'axios'
import fetch from "node-fetch";
import 'dotenv/config'

const BOT_TOKEN = process.env.BOT_ID
const CHANNEL_ID = process.env.CHANNEL_ID 

// Declare HTTP Methods for Axios 
enum RequestMethods {
  GET='GET',
  POST='POST',
  PUT='PUT',
  DELETE='DELETE',
}

enum AcademicYear {
  AY2021_2022 = 2021-2022,
  AY2022_2023 = 2022-2023,
  AY2023_2024 = 2023-2024,
  AY2024_2025 = 2024-2025,
}

enum AcademicSemester {
  SemesterOne = 1,
  SemesterTwo = 2,
}

class ModuleData {
  ModuleCode: string
  ModuleTitle: string
  Semesters: number[]
  constructor(module : any) {
    this.ModuleCode = module.moduleCode
    this.ModuleTitle = module.title
    this.Semesters = module.semesters
  }
}

class CollectionModuleData {
  async getModuleData() {
    const response = await fetch('http://api.nusmods.com/v2/2022-2023/moduleList.json')
    const data = await response.json()
    console.log(data)
  }
}

const md = new CollectionModuleData()

md.getModuleData()

async function getYNCModules(academic_year : AcademicYear, prefix_code : string) {
  const options = {
    method: RequestMethods.GET,
    url: `http://api.nusmods.com/v2/${academic_year}/moduleList.json`,
    headers: {
      accept: 'application/json',
    }
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
getYNCModules(AcademicYear.AY2022_2023, 'CS')

// Send Telegram Message 
async function sendTelegramAlert (message : string) {
  const options = {
    method: RequestMethods.POST,
    url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    headers: {
      accept: 'application/json',
      'User-Agent': 'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
      'content-type': 'application/json'
    },
    data: {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'HTML'
    }
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
