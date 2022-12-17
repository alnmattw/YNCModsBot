// This file contains the user's options for filtering modules
export enum AYearOptions {
  'AY2021/2022' = '2021-2022',
  'AY2022/2023' = '2022-2023',
  'AY2023/2024' = '2023-2024',
  'AY2024/2025' = '2024-2025',
}

export enum ASemesterOptions {
  'Semester 1' = 1,
  'Semester 2' = 2,
  'Both Semesters' = -1 // -1 is used to indicate both semesters
}

export enum AModulePrefixOptions {
  'YSC' = 'YSC',
  'YSS' = 'YSS',
  'YHU' = 'YHU',
  'YID' = 'YID',
  'YLC' = 'YLC',
}

export enum AModuleLevelOptions {
  '1K' = '1',
  '2K' = '2',
  '3K' = '3',
  '4K' = '4',
  'All' = '',
}