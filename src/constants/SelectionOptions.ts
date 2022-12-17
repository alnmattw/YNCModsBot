// This file contains the user's options for filtering modules
export enum AYearOptions {
  AY21_22 = '2021-2022',
  AY22_23 = '2022-2023',
  AY23_24 = '2023-2024',
  AY24_25 = '2024-2025',
}

export enum ASemesterOptions {
  ASOne = 1,
  ASTwo = 2,
  ASBoth = -1 // -1 is used to indicate both semesters
}

export enum AModulePrefixOptions {
  ScienceCourses = 'YSC',
  SocialScienceCourses = 'YSS',
  HumanitiesCourses = 'YHU',
  InterdisciplinaryCourses = 'YID',
  LanguageCourses = 'YLC',
  AllCourses = '',
}

export enum AModuleLevelOptions {
  Level1000 = '1',
  Level2000 = '2',
  Level3000 = '3',
  Level4000 = '4',
  AllLevels = '',
}