export type FusionActiveStatusType = 'A' | 'I';

export type FusionFullPartTimeType = 'FULL_TIME' | 'PART_TIME';

export type FusionHiringStatusType = 'APPROVED' | 'FROZEN' | 'PROPOSED';

export type FusionRegularTemporaryType = 'R' | 'T';

// March 24, 2025
//  Determined on a call that the following properties have the incorrect name:
//  - Positionld (Should be PositionId)
//  - Jobld (Should be JobId)
//  Update these properties when the fix is available in Fusion
export interface FusionUpsertPositionInput {
  Positionld: string;
  EffectiveStartDate: string;
  BusinessUnitId: string;
  DepartmentId: string;
  Jobld: string;
  ReportsToPositionCode: string;
  ActiveStatus: FusionActiveStatusType;
  HiringStatus: FusionHiringStatusType;
  Name: string;
  RegularTemporary: FusionRegularTemporaryType;
  FullPartTime: FusionFullPartTimeType;
  CaseProfile: string;
  AuthorizingId: string;
}

export interface FusionCheckPositionUploadStatusInput {
  PositionId: string;
  SourceSystemId: string;
}
