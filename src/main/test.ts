import { ModuleCollection } from '../modules/ModuleMethods'

const moduleCollection = new ModuleCollection()
const moduleSelection = moduleCollection.getModuleSelection('2022-2023', 'YSC', '3', 2)
const moduleSelectionSummary = moduleCollection.getModuleSelectionSummary('2022-2023', 'YSC', '3', 2)

moduleSelectionSummary.then((data) => {
  console.log(data)
})
console.log(moduleSelectionSummary)
