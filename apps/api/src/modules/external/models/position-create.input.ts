export enum PositionStatus {
  Active = 'A',
  Frozen = 'F',
  Proposed = 'P',
}

export enum PositionDuration {
  Regular = 'R',
  Temporary = 'T',
}

export enum PositionType {
  FullTime = 'F',
  PartTime = 'P',
}

export enum PositionSecurityScreenRequired {
  No = 'N',
  Yes = 'Y',
}

export interface PositionCreateInput {
  BUSINESS_UNIT: string;
  DEPTID: string;
  JOBCODE: string;
  DESCR: string;
  POSN_STATUS: PositionStatus;
  REG_TEMP: PositionDuration;
  FULL_PART_TIME: PositionType;
  TGB_E_CLASS: string;
  TGB_APPRV_MGR: string;
  TGB_SCRTY_SCRN_REQ: PositionSecurityScreenRequired;
  TGB_SCRTY_SCRN_DT?: string;
}
