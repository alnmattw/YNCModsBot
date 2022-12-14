import { ModuleCollection } from '../modules/ModuleMethods'
import '../constants/SelectionOptions'
import { AModuleLevelOptions, AModulePrefixOptions, ASemesterOptions, AYearOptions } from '../constants/SelectionOptions'
var moduleCollection = new ModuleCollection()

const data = moduleCollection.getModuleSelection(undefined, undefined, AModulePrefixOptions.InterdisciplinaryCourses, AModuleLevelOptions.Level3000)
// const data = moduleCollection.getAllModuleData()
console.log(data)