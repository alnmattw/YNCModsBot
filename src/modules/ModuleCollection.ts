// Get from NUSModsAPI
import fetch from "node-fetch";
import {AYearOptions} from '../constants/AcademicOptions'

export class ModuleCollection {
  async getModuleData() {
    const response = await fetch(`http://api.nusmods.com/v2/${AYearOptions.AY21_22}/moduleList.json`)
    const data = await response.json()
    console.log(data)
  }
}