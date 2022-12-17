// This file contains the Telegram bot's response options to commands from the user
export enum TelegramResponseOptions {
  Start =
    `Welcome to the YNC Modules Bot. I am here to help you gather information about the available modules at YNC.`,
  SelectModules =
  `NUS by inputting your filter in the following format: 
  AcademicYear, AcademicSemester, ModulePrefix, ModuleLevel
  For example, to see all available MCS modules in AY2022/2023 Semester 2, input: AY2022/2023, Semester 2, YSC, 4K`,
  AcademicYearOptions =
    `Select your academic year: 
    1. AY2021/2022
    2. AY2022/2023
    3. AY2023/2024
    4. AY2024/2025`,
  AcademicSemesterOptions =
    `Select your academic semester:
    1. Semester 1
    2. Semester 2
    3. Both Semesters`,
  ModulePrefixOptions =
    `Select your module prefix:
    1. Science Courses (YSC)
    2. Social Science Courses (YSS)
    3. Humanities Courses (YHU)
    4. InterdisciplinaryCourses (YID)
    5. Language Courses (YLC)`,
  ModuleLevelOptions =
    `Select your module level:
    1. 1K Modules (1K)
    2. 2K Module (2K)
    3. 3K Modules (3K)
    4. 4K Modules (4K)
    5. All Modules (All)`,
  InvalidInput = 
  `Invalid input. Please try again.`
}