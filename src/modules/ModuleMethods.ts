// Get from NUSModsAPI
import fetch from "node-fetch";
import { ASemesterOptions, AYearOptions, AModuleLevelOptions } from '../constants/SelectionOptions'
import { Module } from './ModuleClass'

export class ModuleCollection {
  // Get all modules from NUSModsAPI
  async getAllModuleData(optionAcademicYear : string = AYearOptions.AY22_23) {
    const response = await fetch(`https://api.nusmods.com/v2/${optionAcademicYear}/moduleList.json`)
    const data = await response.json() as unknown as any[]
    const moduleList = data.map((module: any) => {
      return new Module(module)
    })
    return moduleList
  }
  // Select modules from NUSModsAPI
  async getModuleSelection(
    optionAcademicYear : string = AYearOptions.AY22_23, 
    optionModulePrefixCode: string,
    optionModuleLevel: string,
    optionAcademicSemester: number) {
      const allModules = await this.getAllModuleData(optionAcademicYear)
      const moduleSelection = allModules.filter((module: Module) => {
        return module.ModuleCode.startsWith(optionModulePrefixCode + optionModuleLevel) &&
         module.Semesters.includes(optionAcademicSemester)
      })
      return moduleSelection 
  }
  // Get selected modules summary from NUSModsAPI 
  async getModuleSelectionSummary(
    optionAcademicYear : string = AYearOptions.AY22_23, 
    optionModulePrefixCode: string,
    optionModuleLevel: string,
    optionAcademicSemester: number
  ) {
    const moduleSelection = await this.getModuleSelection(optionAcademicYear, optionModulePrefixCode, optionModuleLevel, optionAcademicSemester)
    
    const moduleSelectionSummary = moduleSelection.map((module: Module, index: number) => {
      return `${index + 1}.` + ' ' + module.ModuleCode + ' ' + module.ModuleTitle
    })

    return moduleSelectionSummary
  }
}