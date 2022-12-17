// This class is used to fetch and filter modules from NUSModsAPI
import fetch from "node-fetch";
import { ASemesterOptions, AYearOptions, AModuleLevelOptions } from '../constants/SelectionOptions'
import { Module } from './ModuleClass'

const NUSModsAPIURL = 'https://api.nusmods.com/v2/'

export class ModuleCollection {
  // Get all modules from NUSModsAPI
  async getAllModules(optionAcademicYear: string): Promise<Module[]> {
    const urlModuleList = '/moduleList.json'
    const response = await fetch(`${NUSModsAPIURL + optionAcademicYear + urlModuleList}`)
    const data = await response.json() as unknown as any[]
    const moduleList: Module[] = data.map((module: any) => {
      return new Module(module)
    })
    return moduleList
  }
  // Select modules from NUSModsAPI
  async getModuleSelection(
    optionAcademicYear: string, 
    optionAcademicSemester: number,
    optionModulePrefixCode: string,
    optionModuleLevel: string) {
      const allModules = await this.getAllModules(optionAcademicYear)
      const moduleSelection = allModules.filter((module: Module) => {
        if (optionAcademicSemester > 0) {
          return module.ModuleCode.startsWith(optionModulePrefixCode + optionModuleLevel) && module.Semesters.includes(optionAcademicSemester)
        } else {
          return module.ModuleCode.startsWith(optionModulePrefixCode + optionModuleLevel) && this.isArrContainsValues(module.Semesters, [1, 2])
        }
      })
      return moduleSelection 
  }
  // Get selected modules summary from NUSModsAPI 
  async getModuleSelectionMessage(
    optionAcademicYear: string, 
    optionAcademicSemester: number,
    optionModulePrefixCode: string,
    optionModuleLevel: string
  ) {
    const moduleSelection = await this.getModuleSelection(optionAcademicYear, optionAcademicSemester, optionModulePrefixCode, optionModuleLevel)
    const moduleSelectionMessage = moduleSelection.map((module: Module, index: number) => {
      return `${index + 1}.` + ' ' + module.ModuleCode + ' ' + module.ModuleTitle
    })
    return moduleSelectionMessage
  }
  // Check if the array contains all the values
  async isArrContainsValues (arr, values) {
    return values.every(value => {
      return arr.includes(value)
    })
  }
}