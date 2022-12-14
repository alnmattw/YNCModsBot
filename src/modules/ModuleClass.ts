export class Module {
  ModuleCode : string
  ModuleTitle : string
  Semesters : number[]
  constructor (module : any) {
    this.ModuleCode = module.moduleCode
    this.ModuleTitle = module.title
    this.Semesters = module.semesters
  }
}