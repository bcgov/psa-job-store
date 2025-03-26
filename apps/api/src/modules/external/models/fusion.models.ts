export type FusionActiveStatusType = 'A' | 'I';

export type FusionFullPartTimeType = 'FULL_TIME' | 'PART_TIME';

export type FusionHiringStatusType = 'APPROVED' | 'FROZEN' | 'PROPOSED';

export type FusionRegularTemporaryType = 'R' | 'T';

export interface FusionUpsertPositionInput {
  PositionId: string;
  EffectiveStartDate: string;
  BusinessUnitId: string;
  DepartmentId: string;
  JobId: string;
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
