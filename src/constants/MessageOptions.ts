// This file contains the Telegram bot's response options to commands from the user
export enum TelegramResponseOptions {
  Start =
    `Welcome to the YNC Modules Bot. I am here to help you gather information about the available modules at YNC.`,
  SelectModules =
    `See what modules are offered at YNC or NUS by inputting your filter in the following format: \n 
    AcademicYear, ModulePrefix, ModuleLevel, Semester \n
    For example, to see all available MCS modules in AY2022/2023 Semester 2, input: \n
    2022-2023, YSC, 3, 2`,
  AcademicYearOptions =
    `Select your academic year: 
    1. AY2021/2022 \n
    2. AY2022/2023 \n
    3. AY2023/2024 \n
    4. AY2024/2025 \n`,
  AcademicSemesterOptions =
    `Select your academic semester: \n
    1. Semester 1 \n
    2. Semester 2 \n
    3. Both Semesters \n`,
  ModulePrefixOptions =
    `Select your module prefix: \n
    1. Science Courses (YSC) \n
    2. Social Science Courses (YSS) \n
    3. Humanities Courses (YHU) \n
    4. InterdisciplinaryCourses (YID) \n
    5. Language Courses (YLC) \n`,
  ModuleLevelOptions =
    `Select your module level: \n
    1. 1K Modules (1K) \n
    2. 2K Module (2K) \n
    3. 3K Modules (3K) \n
    4. 4K Modules (4K) \n
    5. All Modules (All) \n`,
  InvalidInput = 
  `Invalid input. Please try again.`
}