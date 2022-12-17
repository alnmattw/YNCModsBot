// This class is used to fetch and filter modules from NUSModsAPI
import fetch from "node-fetch";
import { ASemesterOptions, AYearOptions, AModuleLevelOptions, AModulePrefixOptions } from '../constants/SelectionOptions'
import { Module } from './ModuleClass'

const NUSModsAPIURL = 'https://api.nusmods.com/v2/'

export enum ParameterOptions {
  AcademicYear = 0,
  AcademicSemester = 1,
  ModulePrefixCode = 2,
  ModuleLevel = 3,
}

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
  isEnumValue<R extends (string | number), T extends {[key: string] : R}>(myEnum: T, enumValue: string): boolean {
    return Object.values(myEnum).includes(enumValue as R)
  }
  matchEnumValue(myEnum, enumKey: string) {
    if (this.isEnumKey(myEnum, enumKey)) {
      return myEnum[enumKey]
    }
  }
  isEnumKey<R extends (string | number), T extends {[key: string] : R}>(myEnum: T, enumKey: string): boolean {
    return Object.keys(myEnum).includes(enumKey)
  }
  // Verify Input from Telegram User 
  verifyInput (input: string): boolean {
    const inputArr = input.split(',').map((message) => message.trim())
    if (inputArr.length !== 4) {
      return false
    }
    const optionAcademicYear: string = inputArr[ParameterOptions.AcademicYear]
    const optionAcademicSemester: string = inputArr[ParameterOptions.AcademicSemester]
    const optionModulePrefixCode: string = inputArr[ParameterOptions.ModulePrefixCode]
    const optionModuleLevel: string = inputArr[ParameterOptions.ModuleLevel]

    const isValidAYear: boolean = this.isEnumKey(AYearOptions, optionAcademicYear)
    const isValidASemester: boolean = this.isEnumKey(ASemesterOptions, optionAcademicSemester)
    const isValidModulePrefixCode: boolean = this.isEnumKey(AModulePrefixOptions, optionModulePrefixCode)
    const isValidModuleLevel: boolean = this.isEnumKey(AModuleLevelOptions, optionModuleLevel)
    if (isValidAYear && isValidASemester && isValidModulePrefixCode && isValidModuleLevel) {
      return true
    } else {
      return false
    }
  }
}