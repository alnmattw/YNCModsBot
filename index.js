import fetch from "node-fetch"
import 'dotenv/config'

const BOT_TOKEN = process.env.BOT_ID
const CHANNEL_ID = process.env.CHANNEL_ID 

// Declare HTTP Methods for Axios 

class ModuleData {
  constructor(module) {
    this.module = module.moduleCode
    this.title = module.title
    this.semesters = module.semesters
  }
}

class CollectionModuleData {
  async getModuleDataByAcademicYear(academic_year) {
    const response = await fetch(`http://api.nusmods.com/v2/${academic_year}/moduleList.json`)
    const data = await response.json()
    const moduleData = await data.map(
      (module) => {
        return new ModuleData(module)
      }
    )
    return moduleData
  }
  async getModuleDataByAcademicYearAndSemester(academic_year, semester) {
    const response = await fetch(`http://api.nusmods.com/v2/${academic_year}/moduleList.json`)
    const data = await response.json()
    const moduleData = await data.map(
      (module) => {
        return new ModuleData(module)
      }
    )
    const filteredModuleData = moduleData.filter((module) => {
      return module.semesters.includes(semester)
    })
    return filteredModuleData
  }
  async getModuleDataByAcademicYearAndSemesterAndModulePrefix(academic_year, semester, module_prefix) {
    const response = await fetch(`http://api.nusmods.com/v2/${academic_year}/moduleList.json`)
    const data = await response.json()
    const moduleData = await data.map(
      (module) => {
        return new ModuleData(module)
      }
    )
    const filteredModuleDataByAcademicYearAndSemester = moduleData.filter((module) => {
      return module.semesters.includes(semester)
    })

    const filteredModuleDataByAcademicYearAndSemesterAndModulePrefix = filteredModuleDataByAcademicYearAndSemester.filter((module) => {
      return module.module.startsWith(module_prefix)
    })
    return filteredModuleDataByAcademicYearAndSemesterAndModulePrefix
  }
}

const md = new CollectionModuleData()

md.getModuleDataByAcademicYearAndSemesterAndModulePrefix("2022-2023", 1, "YSC")
.then(modules => {
    modules.forEach(module => {
     console.log(module)
    });
}).catch(error => {
    console.error(error);
});